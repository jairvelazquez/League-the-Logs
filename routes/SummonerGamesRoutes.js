const express = require('express');
const router = express.Router();
const SummonerGames = require('../models/SummonerGamesModels');

// Home page route.
router.post('/', async function (req, res) {
    const sumGames = new SummonerGames(req.body);
    const savedPost = await sumGames.save();
    res.send(savedPost);
})

// About page route.
router.get('/get-games-by-summoner/:summonerName', async function (req, res) {
    try{
        const games = await SummonerGames.find();
        const gamesBySummoner= getGamesBySummoner(games,req.params.summonerName);
        res.send(gamesBySummoner);
        }catch(error){
            res.send(error);
        }
})

function getGamesBySummoner(games,summonerName){
    let gamesBySummoner = [];
    for(let i=0;i<games.length;i++){
        if(games[i].id_summoner === summonerName){
            gamesBySummoner.push(games[i]);
        }
    }
    return gamesBySummoner;
}
module.exports = router;
