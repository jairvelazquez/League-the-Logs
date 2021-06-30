const express = require("express");
const router = express.Router();
const Users = require("../models/UserModels");
const Summoners = require("../models/SummonerModels");
const jwt = require("jsonwebtoken");
const llave = process.env.SECRET_KEY;

router.post("/", async function (req, res) {
  const user = new Users(req.body);
  const savedPost = await user.save();
  console.log(savedPost);
  res.send(savedPost);
});


router.post("/login", async function (req, res) {
  try {
    const user = await Users.find();
    const userFound = findUser(user, req.body.username);
    if (req.body.password === userFound.password) {
      const payload = {
        admin: userFound.admin,
        name: userFound.username
      };
      jwt.sign(
        payload,
        llave,
        {
          expiresIn: 86400,
        },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json({
            token,
            userFound
          });
        }
      );
    }
  } catch (error) {
    res.send(error);
  }
});

router.patch("/forget-password/:myemail", async function (req, res) {
  try {
    const updatePass = await Users.updateOne(
      {
        email: req.params.myemail,
      },
      {
        $set: {
          password: req.body.password,
        },
      }
    );
    res.send(updatePass);
  } catch (error) {
    res.send(error);
  }
});

router.get('/:username', async function (req, res){
  const user = await Summoners.find();
  const userFound = findSummoner(user, req.params.username);
  try {
    res.send(userFound);
  }catch(error){
    res.error(error);
  }
});

function findUser(users, usuario) {
  let user;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === usuario) {
      user = users[i];
    }
  }
  return user;
}
function findSummoner(users, usuario) {
  let user;
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === usuario) {
      user = users[i];
    }
  }
  return user;
}

module.exports = router;
