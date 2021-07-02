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

router.get('/get-damage-by-summoner/:summonerName', async function (req, res) {
    try{
        const damages = await Damage.find();
        const damageBySummoner = await getDamageBySummoner(damages, req.params.summonerName);
        res.json({damageBySummoner});
        }catch(error){
            console.log(error);
            res.send(error);
        }
})

async function getDamageBySummoner(damages,summonerName){
    let damageBySummoner = [];
    for(let i=0;i<damages.length;i++){
        if(damages[i].summonerName === summonerName){
            damageBySummoner.push(damages[i]);
        }
    }
    return damageBySummoner;
}

module.exports = router;