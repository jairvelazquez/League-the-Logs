const mongoose = require('mongoose');

const TeamsSchema = mongoose.Schema({
	team_id:{ type: Number, required: true },
	id_objectives:{ type: mongoose.Schema.ObjectId, ref: "ObjectivesModel", required: true },
    winner:{ type: Boolean, required: true }
});

module.exports = mongoose.model('TeamsModel', TeamsSchema);