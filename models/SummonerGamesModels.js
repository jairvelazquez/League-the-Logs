const mongoose = require("mongoose");

const SummonerGamesSchema = mongoose.Schema({
  id_summoner: { type: String, required: true },
  summonerName: { type: String, required: true },
  id_game: { type: Number, required: true },
  id_champ: { type: Number, required: true },
  id_damage: { type: Number, required: true },
  lane: { type: String, required: true },
  kills: { type: Number, required: true },
  deaths: { type: Number, required: true },
  assists: { type: Number, required: true },
  farm: { type: Number, required: true },
  vision: { type: Number, required: true },
  idTeam: { type: Number, required: true },
  gold: { type: Number, required: true },
  win: { type: Boolean, required: true },
});

module.exports = mongoose.model("SumonnerGamesModels", SummonerGamesSchema);
