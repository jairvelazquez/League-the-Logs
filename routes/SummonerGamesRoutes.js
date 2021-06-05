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
router.get('/', async function (req, res) {
  try{
    const summGames = await SummonerGames.find();
    res.send(summGames);
    }catch(error){
        res.send(error);
    }
})

module.exports = router;
