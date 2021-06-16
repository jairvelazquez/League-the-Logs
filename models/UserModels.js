const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

	username: {type: String,  required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	img: { type: String }

});

module.exports = mongoose.model('UserModels', UserSchema);