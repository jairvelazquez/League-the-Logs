const express = require('express');
const router = express.Router();
const Games = require('../models/GamesModels');

// Home page route.
router.post('/', async function (req, res) {
    const game = new Games(req.body);
    const savedPost = await game.save();
    res.send(savedPost);
})

// About page route.
router.get('/', async function (req, res) {
  try{
    const games = await Games.find();
    res.send(games);
    }catch(error){
        res.send(error);
    }
})

module.exports = router;