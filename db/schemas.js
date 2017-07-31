var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema ({
	activity: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	calories: {
		type: Number,
		required: true
	},
	timestamp: {
		type: String,
		// get new date, convert to time string, split on spaces, get 0th index which is the time
		default: new Date().toTimeString().split(' ')[0]
	}
});

var Log = mongoose.model('log', logSchema);

var userSchema = new Schema ({

	userName: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	desiredCalories: {
		type: Number,
		required: true
	}
});

var User = mongoose.model('user', userSchema);

module.exports.log = Log;
module.exports.user = User;