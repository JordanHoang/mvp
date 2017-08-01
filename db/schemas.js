var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

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
	}
}, { timestamps: { createdAt: 'created_at' } });

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
	},
	logs: [{type: ObjectId, ref: Log}]
});

var User = mongoose.model('user', userSchema);

module.exports.log = Log;
module.exports.user = User;