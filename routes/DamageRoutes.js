const express = require('express');
const router = express.Router();
const Damage = require('../models/DamageModels');

// Home page route.
router.post('/', async function (req, res) {
    const dmg = new Damage(req.body);
    const savedPost = await dmg.save();
    res.send(savedPost);
})

// About page route.
router.get('/', async function (req, res) {
  try{
    const damage = await Damage.find();
    res.send(damage);
    }catch(error){
        res.send(error);
    }
})

module.exports = router;