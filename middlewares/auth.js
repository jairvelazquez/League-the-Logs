const express = require("express");
var app = express();
const jwt = require("jsonwebtoken");
const llave = "millavesecreta";


module.exports = function (req, res, next) {
  const token = req.headers["access-token"];
  //console.log("middleware: "+llave);
  if (token) {
    jwt.verify(token, llave, (err, decoded) => {    
        //console.log(decoded.check);  
      if (err) {
        return res.json({ mensaje: 'Token inválido' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    res.send({ 
        mensaje: 'Token no proveído' 
    });
  }
};
