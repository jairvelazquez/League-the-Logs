const express = require('express');
const router = express.Router();
const Tops = require('../models/GamesModels');

// Home page route.
router.post('/', async function (req, res) {
    const top = new Tops(req.body);
    const savedPost = await top.save();
    res.send(savedPost);
})

// About page route.
router.get('/', async function (req, res) {
  try{
    const topPlayers = await Tops.find();
    res.send(topPlayers);
    }catch(error){
        res.send(error);
    }
})

module.exports = router;