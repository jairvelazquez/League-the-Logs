const mongoose = require('mongoose');
const ChampionsSchema = mongoose.Schema({

	id_champion:{ type: Number, required: true },
	champion_name:{ type: Number, required: true }
});

module.exports = mongoose.model('ChampionsModel', ChampionsSchema);

const TeamsSchema = mongoose.Schema({

	team_id:{ type: Number, required: true },
	id_objectives:{ type: Schema.ObjectId, ref: "ObjectivesModel", required: true },
    	winner:{ type: Boolean, required: true }
});

module.exports = mongoose.model('TeamsModel', TeamsSchema);

const ObjectivesSchema = mongoose.Schema({
	
    id_objetives:{ type: Number, required: true },
	first_blood:{ type: Boolean, required: true },
	turrets_destroyed:{ type: Number, required: true },
	dragons:{ type: Number, required: true },
	barons:{ type: Number, required: true },
	herald:{ type: Number, required: true },
	inhibitors:{ type: Number, required: true }

});

module.exports = mongoose.model('ObjectivesModel', ObjectivesSchema);

const BanSchema = mongoose.Schema({

	ban: {type: Number,  required: true},
	bannedChamp: {type: Schema.ObjectId, ref:"ChampionsModels", required: true},
	nombre: {type: String, required: true},
	level: {type: Number, required: true},
	primaryRol: {type: String, required: true},
	secondaryRol: {type: String, required: true}

});

module.exports = mongoose.model('BanModels', BanSchema);

const DamageSchema = mongoose.Schema({
		
	damage_id:{type: Number, required: true},
	physicalDamage: {type: Number, required: true},
	magicDamage:{type: String, require: true},
	trueDamage:{type: Number, require: true},
	totalDamage:{type: String, require: true},
	
});

module.exports = mongoose.model('DamageModels', DamageSchema);

const UserSchema = mongoose.Schema({

	username: {type: String,  required: true},
	email: {type: String, required: true},
	password: {type: String, required: true}

});

module.exports = mongoose.model('UserModels', UserSchema);

const SummonerSchema = mongoose.Schema({
	
	account:{type: String, required: true},
	summoner: {type: String, required: true}, 
	nombre:{type: String, require: true},
	level:{type: Number, require: true},
	primaryRol:{type: String, require: true},
	secondaryRol:{type: String, require: true}
});

module.exports = mongoose.model('SummonerModel', SummonerSchema);

const SummonerGamesSchema = new Schema({
    id_summoner: {type:String, required:true},
    id_game:{type:Number, required:true},
    id_champ: {type:Number, required:true},
    id_damage: {type:Number, required:true},
    kills: {type:Number, required:true},
    deaths: {type:Number, required:true},
    assists: {type:Number, required:true},
    farm: {type:Number, required:true},
    vision: {type:Number, required:true},
    idTeam:{type:Number, required:true},
    gold: {type:Number,  required:true}
});

module.exports = mongoose.model('SumonnerGamesModels', SummonerGamesSchema)

const GamesSchema = new Schema({
    id_game: {type:Number, required:true},
    map: {type:String, required:true},
    mode: {type:String, required:true}, 
    duration: {type:Number, required:true},
    patch: {type:String, required:true},
    region: {type:String, required:true},
    id_team1: {type:Number, required:true},
    id_team2: {type:Number, required:true}
});

module.exports = mongoose.model('GamesModels', GamesSchema)

const TopPlayersSchema = new Schema({
    summoner_id: {type:String,required:true},
    summoner_name: {type:String,required:true},
    server: {type:String,required:true},
    rank: {type:String,required:true},
    division: {type:String,required:true},
    position: {type:String,required:true}
});

module.exports = mongoose.model('TopPlayersModels', TopPlayersSchema);