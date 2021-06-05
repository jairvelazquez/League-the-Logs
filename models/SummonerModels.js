const mongoose = require('mongoose');

const SummonerSchema = mongoose.Schema({
	
	account:{type: String, required: true},
	summoner: {type: String, required: true}, 
	name:{type: String, require: true},
	level:{type: Number, require: true},
	primaryRole:{type: String, require: true},
	secondaryRole:{type: String, require: true}
});

module.exports = mongoose.model('SummonerModel', SummonerSchema);