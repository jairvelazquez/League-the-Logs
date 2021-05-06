const mongoose = require('mongoose');

const TopPlayersSchema =  mongoose.Schema({
    summoner_id: {type:String,required:true},
    summoner_name: {type:String,required:true},
    server: {type:String,required:true},
    rank: {type:String,required:true},
    division: {type:String,required:true},
    position: {type:String,required:true}
});

module.exports = mongoose.model('TopPlayersModels', TopPlayersSchema);