const express = require('express');
const router = express.Router();
const request = require('request-promise');
const BanModels = require('../models/BanModels');
const ChampionsModels = require('../models/ChampionsModels');
const DamageModels = require('../models/DamageModels');
const Sum = require('../models/SummonerGamesModels')
const direccionPeticion = "https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
const direccionPeticionMatches = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/";
const direccionPeticionMatch = "https://americas.api.riotgames.com/lol/match/v5/matches/";

let levelSum;

router.get("/:summonerName", async function (req, res) {
    try {
        let puuid = await getPuid(req.params.summonerName);
        let matches = await getMatches(puuid);
        let DataMatches = await getDataMatches(matches);
        fillDatabaseWithMatches(DataMatches, puuid);
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
            puid = response.puuid;
            levelSum = response.summonerLevel;
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
function fillDatabaseWithMatches(DataMatches, puuid) {
    for (let match of DataMatches) {
        fillSummonerGamesModel(match, puuid);
        fillBanModels(match, puuid);
        fillChampionsModel(match, puuid);
        fillDamageModel(match, puuid);
    }
}

function getSummoner(match, puuid) {
    for (let participant of match.participants) {
        if (participant.puuid === puuid) {
            return participant;
        }
    }
}
async function fillSummonerGamesModel(match, puuid) {
    const summoner = getSummoner(match, puuid);
    let summ = new Sum({
        id_summoner: summoner.summonerId,
        id_game: match.gameId,
        id_champ: summoner.championId,
        id_damage: summoner.totalDamageDealt,
        kills: summoner.kills,
        deaths: summoner.deaths,
        assists: summoner.assists,
        farm: summoner.totalMinionsKilled,
        vision: summoner.visionScore,
        idTeam: summoner.teamId,
        gold: summoner.goldEarned,
        win: summoner.win,
    });
    await summ.save();
}
async function fillBanModels(match, puuid) {
    let bans = new BanModels();
    let summoner = getSummoner(match, puuid);
    bans.summonerName = summoner.summonerName;
    try{
        bans.bannedChamp = match.teams[1].bans[1].championId;
    }catch(error){
        console.log("Jugador no seleccionó baneo");
        bans.bannedChamp = 0;
    }
    bans.nombre = summoner.championName;
    bans.level = levelSum;
    bans.primaryRole = summoner.lane;
    await bans.save();
}
async function fillChampionsModel(match, puuid) {
    let championsModel = new ChampionsModels();
    let summoner = getSummoner(match, puuid);
    championsModel.id_champion = summoner.championId;
    championsModel.champion_name = summoner.championName;
    await championsModel.save();
}
async function fillDamageModel(match, puuid) {
    let fillDamageModel = new DamageModels();
    let summoner = getSummoner(match, puuid);
    fillDamageModel.summonerName = summoner.summonerName;
    fillDamageModel.physicalDamage = summoner.physicalDamageDealtToChampions;
    fillDamageModel.magicDamage = summoner.magicDamageDealtToChampions;
    fillDamageModel.trueDamage = summoner.trueDamageDealtToChampions;
    fillDamageModeltotalDamage = summoner.totalDamageDealtToChampions;
    await fillDamageModel.save();
}
module.exports = router;