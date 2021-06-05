const express = require('express');
const router = express.Router();
const Champion = require('../models/GamesModels');

// Home page route.
router.post('/', async function (req, res) {
    const champ = new Champion(req.body);
    const savedPost = await champ.save();
    res.send(savedPost);
})

// About page route.
router.get('/', async function (req, res) {
  try{
    const champs = await Champion.find();
    res.send(champs);
    }catch(error){
        res.send(error);
    }
})

module.exports = router;