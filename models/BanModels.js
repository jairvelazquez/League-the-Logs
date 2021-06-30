const mongoose = require('mongoose');

const BanSchema = mongoose.Schema({
	summonerName: {type: String,  required: true},
	bannedChamp: {type: Number, required: true},
	nombre: {type: String, required: true},
	level: {type: Number, required: true},
	primaryRole: {type: String, required: true}
});

module.exports = mongoose.model('BanModels', BanSchema);