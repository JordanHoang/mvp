var bluebird = require('bluebird');
var Log = require('../db/schemas.js').log
var User = require('../db/schemas.js').user;
var schedule = require('node-schedule');

// reset daily calories to desired calories
var calorieReset = schedule.scheduleJob('0 0 * * *', () => { 
	User.find( {}, (err, users) => {
		users.forEach( (user) => {
			user.currentCalories = user.desiredCalories;
		})
	})
}) // run everyday at midnight

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

			User.findOne({userName: username}, 'logsPush currentCalories', function (err, user) {
				if (err) {
					return console.log(err);
				}

				// user sends id, current calories, and logs
				res.json(user);
			})
		},

		// post a new log to a db
		post: (req, res) => {

			var username = req.params.username;

			User.findOne({userName: username}, (err, user) => {

				var userId = user._id;
				var currentCal = user.currentCalories;

				if (user.logsPush.length) {
					var lastId = user.logsPush[user.logsPush.length - 1].id
				} else {
					var lastId = 0
				}
				var newLog = {
					id: lastId + 1,
					activity: req.body.activity,
					description: req.body.description,
					calories: Number(req.body.calories),
					// _creator: userId
					timestamp: new Date()
				};

				if (newLog.activity === 'exercise') {
					req.body.calories = -req.body.calories
				}

				User.findByIdAndUpdate(
	        userId,
	        {$push: {"logsPush": newLog}},
	        {safe: true, upsert: true, new : true},
	        function(err, model) {
	          if (err) {
	          	console.log(err)
	          };
	          User.findByIdAndUpdate(
	          	userId,
	          	{$set: {currentCalories: currentCal + Number(req.body.calories) }},
	          	{safe: true, upsert: true, new : true},
	          	function(err, model) {
	          	  if (err) {
	          	  	console.log(err)
	          	  };
	          	  res.sendStatus(201);
	          	}
	          )
	        }
		    );

		    ///////////////// ATTEMPT AT DOING FOREIGN KEYS AND POPULATION /////////////
				// User.logsPush.push(newLog);
				// User.save( (err) => {

				// 	if (err) {
				// 		return console.log(err);
				// 	}
				// 	res.sendStatus(201);
				// });

				// newLog.save( (err) => {
				// 	if (err) {
				// 		return console.log(err);
				// 	}

				// 	res.sendStatus(201);
				// })

				////////////////////////////////////////////////////////////////////////////
			});
		},

		delete: (req, res) => {
					var username = req.params.username;
					var id = req.body.id;

					User.findOne({userName: username}, (err, user) => {
						var userId = user._id;
						var currentCal = user.currentCalories;

						if (req.body.activity === 'food') {
							req.body.calories = -req.body.calories
						}

						User.findByIdAndUpdate(
			        userId,
			        {$pull: {"logsPush": {id: id} } },
			        {safe: true, upsert: true, new : true},
			        function(err, model) {
			          if (err) {
			          	console.log(err)
			          };
			          User.findByIdAndUpdate(
			          	userId,
			          	{$set: {currentCalories: currentCal + Number(req.body.calories) }},
			          	{safe: true, upsert: true, new : true},
			          	function(err, model) {
			          	  if (err) {
			          	  	console.log(err)
			          	  };
			          	  res.sendStatus(202);
			          	}
			          )
			        }
				    );
					}
				)
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
				desiredCalories: -req.body.desiredCalories,
				currentCalories: -req.body.desiredCalories,
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