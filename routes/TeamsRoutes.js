const express = require('express');
const router = express.Router();
const Teams = require('../models/GamesModels');

// Home page route.
router.post('/', async function (req, res) {
    const team = new Teams(req.body);
    const savedPost = await team.save();
    res.send(savedPost);
})

// About page route.
router.get('/', async function (req, res) {
  try{
    const teams = await Teams.find();
    res.send(teams);
    }catch(error){
        res.send(error);
    }
})

module.exports = router;