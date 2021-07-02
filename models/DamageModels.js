const mongoose = require('mongoose');

const DamageSchema = mongoose.Schema({
	summonerName:{type: String, required: true},
	physicalDamage: {type: Number, required: true},
	magicDamage:{type: Number, require: true},
	trueDamage:{type: Number, require: true},
	totalDamage:{type: Number, require: true},
});

module.exports = mongoose.model('DamageModels', DamageSchema);
