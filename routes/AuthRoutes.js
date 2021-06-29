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
  console.log(token);
});

module.exports = router;
