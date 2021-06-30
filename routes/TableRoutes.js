const express = require('express');
const router = express.Router();
const request = require('request-promise');
const SGM = require("../models/SummonerGamesModels");
const direccionPeticion = "https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
const direccionPeticionMatches = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/";
const direccionPeticionMatch = "https://americas.api.riotgames.com/lol/match/v5/matches/";

router.get("/:summonerName", async function (req, res) {
    try {
        let puuid = await getPuid(req.params.summonerName);
        let matches = await getMatches(puuid);
        let DataMatches = await getDataMatches(matches);
        fillDatabaseWithMatches(DataMatches.DataMatches);
        res.json({ DataMatches });
    } catch {
        res.error("Error al enviar la info");
    }
});

async function getPuid(summonerName) {
    let puid = "";
    const options = {
        method: 'GET',
        uri: direccionPeticion.concat(summonerName),
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
        await request(options).then(function (response) {
            puid = response.puuid;
            return response.puuid;
        })
            .catch(function (err) {
                console.log(err);
            })
    } catch (error) {
    }
    return puid;
}

async function getMatches(puid) {
    let matches;
    const options = {
        method: 'GET',
        uri: direccionPeticionMatches.concat(puid, "/ids?start=0&count=10"),
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
        await request(options).then(function (response) {
            matches = response;
            return response;
        })
            .catch(function (err) {
                console.log(err);
            })
    } catch (error) {
    }
    return matches;
}

async function getDataMatches(matches) {
    let dataMatches = [];
    for await (let match of matches) {
        console.log("Yendo por:" + match);
        const options = {
            method: 'GET',
            uri: direccionPeticionMatch.concat(match),
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
            await request(options).then(function (response) {
                dataMatches.push(response.info);
                return dataMatches;
            })
                .catch(function (err) {
                    console.log(err);
                })
        } catch (error) {
        }
    }
    return dataMatches;
}

function fillDatabaseWithMatches(DataMatches){
    fillSummonerGamesModel(DataMatches);
}

function fillSummonerGamesModel(DataMatches){
    for(let match of DataMatches){
    let games = new SGM();
    games.id_summoner = getSummoner(dataMatches);
    }
}

function getSummoner(dataMatch) {
    for (let participant of dataMatch.participants) {
      if (participant.summonerName === summonerName) {
        return participant;
      }
    }
  }

module.exports = router;