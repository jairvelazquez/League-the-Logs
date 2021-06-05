const mongoose = require('mongoose');

const DamageSchema = mongoose.Schema({
		
	damage_id:{type: Number, required: true},
	physicalDamage: {type: Number, required: true},
	magicDamage:{type: String, require: true},
	trueDamage:{type: Number, require: true},
	totalDamage:{type: String, require: true},
	
});

module.exports = mongoose.model('DamageModels', DamageSchema);
