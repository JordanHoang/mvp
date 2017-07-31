var bluebird = require('bluebird');
var Log = require('../db/schemas.js').log
var User = require('../db/schemas.js').user;

module.exports = {

	logs: {
		// return all logs from db
		get: (req, res) => {
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
				username: 'jordanhoang'
			});
		},
		// check request credentials against users entity
		signin: (req, res) => {

		}
	}

};