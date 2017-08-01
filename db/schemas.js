var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

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
	},
	currentCalories: {
		type: Number,
		required: true
	},
	logsPush: [],
	logs: [{type: Schema.Types.ObjectId, ref: 'Log'}]
});

var logSchema = new Schema ({
	_creator: { type: Schema.Types.ObjectId, ref: 'User' },
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
	}
}, { timestamps: { createdAt: 'created_at' } });

var User = mongoose.model('user', userSchema);
var Log = mongoose.model('log', logSchema);

module.exports.log = Log;
module.exports.user = User;