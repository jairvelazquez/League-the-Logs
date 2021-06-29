const express = require("express");
const router = express.Router();
const Users = require("../models/UserModels");
const jwt = require("jsonwebtoken");
const llave = process.env.SECRET_KEY;


//console.log("ruta"+llave);
router.post("/", async function (req, res) {
  //console.log(req.body);
  const user = new Users(req.body);
  const savedPost = await user.save();
  console.log(savedPost);
  res.send(savedPost);
});

// About page route.}
router.post("/login", async function (req, res) {
  try {
    //console.log(req.body);
    const user = await Users.find();
    const userFound = findUser(user, req.body.username);
    //console.log(user);
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
          //console.log(token);
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

function findUser(users, usuario) {
  //console.log(users);
  //console.log(usuario);

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === usuario) {
      //console.log(users[i]);
      return users[i];
    }
  }
  return user;
}

module.exports = router;
