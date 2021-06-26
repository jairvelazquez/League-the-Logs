const express = require("express");
const router = express.Router();
const Users = require("../models/UserModels");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  let LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
  localStorage.clear();
  res.json({
    mensaje: 'Sesión terminada'
  });
});

module.exports = router;
