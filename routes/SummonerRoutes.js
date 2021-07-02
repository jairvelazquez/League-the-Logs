const express = require('express');
const router = express.Router();
const Summoner = require('../models/SummonerModels');
const request = require('request-promise');

const direccionPeticion = "https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";

// About page route.
router.post('/:summonerName', async function (req, res) {
    //console.log(process.env.RIOT_TOKEN);
    //console.log(direccionPeticion.concat(req.params.summonerName));
    const options = {
        method: 'GET',
        uri: direccionPeticion.concat(req.params.summonerName),
        json: true,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36",
            "Accept-Language": "es-419,es;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": process.env.RIOT_TOKEN
        }
    }

    try {
        //const summ = await Summoner.findById(req.summonerName);
        request(options).then(function (response) {
            const summoner = new Summoner(getSummoner(response));
            summoner.save();
            res.status(200).json(response);
        })
            .catch(function (err) {
                console.log(err);
            })
    } catch (error) {
        res.send(error);
    }
})

function getSummoner(response) {
    const sum1 = {
        account: response.accountId,
        summoner: response.id,
        name: response.name,
        level: response.summonerLevel,
        primaryRole: "A",
        secondaryRole: "B"
    }
    return sum1;
}

module.exports = router;
