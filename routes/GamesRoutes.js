const express = require('express');
const router = express.Router();
const Games = require('../models/GamesModels');

// Home page route.
router.post('', async function (req, res) {
    const game = new Games(req.body);
    const savedPost = await game.save();
    res.send(savedPost);
})

// About page route.
router.get('/get-games-by-summoner/:summonerName', async function (req, res) {
  try{
    const games = await Games.find();
    const gamesBySummoner= getGamesBySummoner(games,req.params.summonerName);
    res.send(gamesBySummoner);
    }catch(error){
        res.send(error);
    }
})
function getGamesBySummoner(games,summonerName){
    
}


module.exports = router;