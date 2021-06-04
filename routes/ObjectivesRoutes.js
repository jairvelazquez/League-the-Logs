const express = require('express');
const router = express.Router();
const Objetives = require('../models/ObjectivesModels');

// Home page route.
router.post('/', async function (req, res) {
    const obj = new Objetives(req.body);
    const savedPost = await obj.save();
    res.send(savedPost);
})

// About page route.
router.get('/', async function (req, res) {
  try{
    const objectives = await Objetives.find();
    res.send(objectives);
    }catch(error){
        res.send(error);
    }
})

module.exports = router;