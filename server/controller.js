var bluebird = require('bluebird');
var Log = require('../db/schemas.js').log
var User = require('../db/schemas.js').user;

module.exports = {

	logs: {
		// return all logs for an individual user
		get: (req, res) => {
			var username = req.params.username;
			Log.find({}, (err, logs) => {
				if (err) {
					return console.log(err);
				}

				res.json(logs)
			});
		},
		// post a new log to a db
		post: (req, res) => {
			var newLog = Log({
				activity: req.body.activity,
				description: req.body.description,
				calories: req.body.calories
			});

			newLog.save( (err) => {
				if (err) {
					return console.log(err);
				}

				res.sendStatus(201);
			});
		}
	},

	users: {
		// create a new user document
		signup: (req, res) => {
			var newUser = User ({
				userName: req.body.userName,
				password: req.body.password,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				desiredCalories: req.body.desiredCalories,
				logs: []
			});

			newUser.save( (err) => {
				if (err) {
					return console.log(err)
				}

				res.sendStatus(201);
			});
		},

		// check request credentials against users entity
		signin: (req, res) => {
			var credentials = {
				userName: req.body.userName,
				password: req.body.password
			}

			User.findOne({userName: credentials.userName}, (err, user) => {
				if (err) {
					return console.log('Failed signin')
				}

				if (credentials.password !==  user.password) {
					res.sendStatus(404);
				}

				res.status(201);
				res.json({userName: user.userName, firstName: user.firstName, desiredCalories: user.desiredCalories});
			})
		}
	}

};