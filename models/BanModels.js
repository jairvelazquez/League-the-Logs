const mongoose = require('mongoose');

const BanSchema = mongoose.Schema({

	ban: {type: Number,  required: true},
	bannedChamp: {type: mongoose.Schema.ObjectId, ref:"ChampionsModels", required: true},
	nombre: {type: String, required: true},
	level: {type: Number, required: true},
	primaryRol: {type: String, required: true}
});

module.exports = mongoose.model('BanModels', BanSchema);