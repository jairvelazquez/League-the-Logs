const mongoose = require('mongoose');

const ObjectivesSchema = mongoose.Schema({
	
    summonerName:{ type: String, required: true },
	first_blood:{ type: Boolean, required: true },
	turrets_destroyed:{ type: Number, required: true },
	dragons:{ type: Number, required: true },
	barons:{ type: Number, required: true },
	herald:{ type: Number, required: true },
	inhibitors:{ type: Number, required: true }

});

module.exports = mongoose.model('ObjectivesModel', ObjectivesSchema);