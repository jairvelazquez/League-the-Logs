const express = require("express");
var app = express();
const jwt = require("jsonwebtoken");
const llave = "millavesecreta";


module.exports = function (req, res, next) {
  const token = req.headers['access-token'];
  //console.log(req.headers['access-token']);
  if (token) {
    jwt.verify(token, llave, (err, decoded) => {    
      if (err) {
        return res.json({ mensaje: 'Token inválido' });    
      } else{
        req.decoded = decoded; 
        res.json({
          mensaje: 'Token correcto'
        })
        next();
      }
    });
  } else {
    res.send({ 
        mensaje: 'Token no proveído' 
    });
  }
};
