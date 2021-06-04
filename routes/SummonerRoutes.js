const express = require('express');
const router = express.Router();
const Summoner = require('../models/SummonerModels');

// Home page route.
router.post('/', async function (req, res) {
    const sum = new Summoner(req.body);
    const savedPost = await sum.save();
    res.send(savedPost);
})

// About page route.
router.get('/', async function (req, res) {
  try{
    const summ = await Summoner.find();
    res.send(summ);
    }catch(error){
        res.send(error);
    }
})

module.exports = router;
