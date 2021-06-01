const mongoose = require('mongoose');

const ChampionsSchema = mongoose.Schema({
	id_champion:{ type: Number, required: true },
	champion_name:{ type: Number, required: true }
});

module.exports = mongoose.model('ChampionsModel', ChampionsSchema);
