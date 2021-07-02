const express = require("express");
const router = express.Router();
const Users = require("../models/UserModels");
const jwt = require("jsonwebtoken");
const llave = process.env.SECRET_KEY;

router.get("/", (req, res) => {
  let LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
  localStorage.removeItem("token");
  res.json({
    mensaje: "Sesión terminada",
  });
});

router.get("/gettoken", (req, res) => {
  let LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  jwt.verify(token, llave, (err, decoded) => {
    res.send(decoded.admin);
  });
  //console.log(token);
});

router.get("/change-password/:usrEmail", async (req, res) => {
  try {
    const user = await Users.find();
    const userFound = findSummoner(user, req.params.usrEmail);
    //console.log(userFound);
      res.json({password: userFound.password});
  } catch (error) {
    console.log(error);
    res.json({mensaje: error});
  }

});

function findSummoner(users, email) {
  let user;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      user = users[i];
    }
  }
  return user;
}

module.exports = router;
