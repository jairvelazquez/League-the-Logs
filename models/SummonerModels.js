const mongoose = require('mongoose');

const SummonerSchema = mongoose.Schema({
	
	account:{type: String, required: true},
	summoner: {type: String, required: true}, 
	nombre:{type: String, require: true},
	level:{type: Number, require: true},
	primaryRol:{type: String, require: true},
	secondaryRol:{type: String, require: true}
});

module.exports = mongoose.model('SummonerModel', SummonerSchema);