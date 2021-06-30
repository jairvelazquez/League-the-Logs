const express = require('express');
const router = express.Router();
const request = require('request-promise');
const BanModels = require('../models/BanModels');
const ChampionsModels = require('../models/ChampionsModels');
const DamageModels = require('../models/DamageModels');
const direccionPeticion = "https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
const direccionPeticionMatches = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/";
const direccionPeticionMatch = "https://americas.api.riotgames.com/lol/match/v5/matches/";

let level;

router.get("/:summonerName", async function (req, res) {
    try {
        let puuid = await getPuid(req.params.summonerName);
        let matches = await getMatches(puuid);
        let DataMatches = await getDataMatches(matches);
        await fillDatabaseWithMatches(JSON.stringify(DataMatches));
        res.json({ DataMatches });
    } catch (error) {
        console.log(error);
        res.send("Error al enviar la info");
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
            // console.log(response);
            puid = response.puuid;
            level = response.puuid;
            return response.level;
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
        //console.log("Yendo por:" + match);
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
async function fillDatabaseWithMatches(DataMatches) {
    console.log(DataMatches);
    for (let match of DataMatches) {
        if (i === 0) {
            console.log(match);
        }
        fillBanModels(match);
        fillChampionsModel(match);
        fillDamageModel(match);
    }
}
function getSummoner(match) {
    //console.log(match);
    for (let participant of match.participants) {
        if (participant.summonerName === summonerName) {
            return participant;
        }
    }
}

function fillBanModels(match) {
    let bans = new BanModels();
    let summoner = getSummoner(match);
    bans.bannedChamp = match.teams[0].bans[0].championId;
    bans.nombre = summoner.championName;
    bans.level = level;
    bans.primaryRole = summoner.lane;
    bans.save();
}
function fillChampionsModel(match) {
    let championsModel = new ChampionsModels();
    let summoner = getSummoner(match);
    championsModel.id_champion = summoner.championId;
    championsModel.champion_name = summoner.championName;
    championsModel.save();
}
function fillDamageModel(match) {
    let fillDamageModel = new DamageModels();
    let summoner = getSummoner(match);
    fillDamageModel.physicalDamage = summoner.physicalDamageDealtToChampions;
    fillDamageModel.magicDamage = summoner.magicDamageDealtToChampions;
    fillDamageModel.trueDamage = summoner.trueDamageDealtToChampions;
    fillDamageModeltotalDamage = summoner.totalDamageDealtToChampions;
    fillDamageModel.save();
}
module.exports = router;