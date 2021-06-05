const express = require('express');
const router = express.Router();
const Bans = require('../models/BanModels');

// Home page route.
router.post('/', async function (req, res) {
    const ban = new Bans(req.body);
    const savedPost = await ban.save();
    res.send(savedPost);
})

// About page route.
router.get('/', async function (req, res) {
  try{
    const bans = await Bans.find();
    res.send(bans);
    }catch(error){
        res.send(error);
    }
})

module.exports = router;