const mongoose = require('mongoose');

const GamesSchema =  mongoose.Schema({
    id_game: {type:Number, required:true},
    map: {type:String, required:true},
    mode: {type:String, required:true}, 
    duration: {type:Number, required:true},
    patch: {type:String, required:true},
    region: {type:String, required:true},
    id_team1: {type:Number, required:true},
    id_team2: {type:Number, required:true},
    summonerName: {type:String,required:true}
});

module.exports = mongoose.model('GamesModels', GamesSchema)