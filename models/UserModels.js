const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

	username: {type: String,  required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	admin: {type: Boolean, value: false}

});

module.exports = mongoose.model('UserModels', UserSchema);