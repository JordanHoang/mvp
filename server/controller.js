var bluebird = require('bluebird');
var Log = require('../db/schemas.js').log
var User = require('../db/schemas.js').user;

module.exports = {

	logs: {
		// return all logs for an individual user
		get: (req, res) => {
			var username = req.params.username;

			// var query = User.findOne({userName: username});

			// query.select('logsPush');

			// query.exec( (err, logs) => {
			// 	if (err) {
			// 		console.log(err)
			// 	}

			// 	console.log('LOGS', logs.logsPush);
			// 	res.status(200);
			// 	res.json(logs.logsPush);
			// })

			User.findOne({userName: username}, 'logsPush', function (err, logs) {
				if (err) {
					return console.log(err);
				}
				console.log(logs.logsPush);
				res.json(logs.logsPush);
			})
		},

		// post a new log to a db
		post: (req, res) => {

			var username = req.params.username;

			User.findOne({userName: username}, (err, user) => {

				var userId = user._id;

				var newLog = {
					activity: req.body.activity,
					description: req.body.description,
					calories: req.body.calories,
					// _creator: userId
				};

				// User.logsPush.push(newLog);
				// User.save( (err) => {
				// 	if (err) {
				// 		return console.log(err);
				// 	}

				// 	res.sendStatus(201);
				// });

				User.findByIdAndUpdate(
	        userId,
	        {$push: {"logsPush": newLog}},
	        {safe: true, upsert: true, new : true},
	        function(err, model) {
	          if (err) {
	          	console.log(err)
	          };

	          res.sendStatus(201);
	        }
		    );

				// newLog.save( (err) => {
				// 	if (err) {
				// 		return console.log(err);
				// 	}

				// 	res.sendStatus(201);
				// })
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