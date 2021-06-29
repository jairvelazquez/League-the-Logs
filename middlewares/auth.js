const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const llave = "millavesecreta";

module.exports = function (req, res) {
  const token = req.headers["access-token"];
  //console.log(req.headers['access-token']);
  if (token) {
    jwt.verify(token, llave, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválido" });
      } else {
        req.decoded = decoded;
        res.json({
          mensaje: "Token correcto",
        });
        
        if (typeof localStorage === "undefined" || localStorage === null) {
          let LocalStorage = require("node-localstorage").LocalStorage;
          localStorage = new LocalStorage("./scratch");
          localStorage.setItem("token", JSON.stringify(token));
        }else{
        let LocalStorage = require("node-localstorage").LocalStorage;
        localStorage = new LocalStorage("./scratch");
        localStorage.setItem("token", JSON.stringify(token));
        }
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveído",
    });
  }
};
