const express = require("express");
const mongoose = require("mongoose");//Ola
const path = require("path");
const app = express();
const router = express.Router();
require('dotenv/config');//Ola
app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/index.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/dashboard.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/dashboard.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/404.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/404.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/blank.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/blank.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/buttons.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/buttons.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/buttons.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/buttons.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/cards.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/cards.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/charts.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/charts.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/dashboard.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/dashboard.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/forgot-password.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/forgot-password.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/register.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/register.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/tables.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/tables.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/utilities-animation.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/utilities-animation.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/utilities-border.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/utilities-border.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/utilities-color.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/utilities-color.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/utilities-other.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/utilities-other.html'));
    //__dirname : It will resolve to your project folder.
});
router.get('/index.html',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/index.html'));
    //__dirname : It will resolve to your project folder.
});

app.use('/img', express.static(__dirname + '/img'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/scss', express.static(__dirname + '/scss'));
app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/js', express.static(__dirname + '/js'));

//Conexion a la DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },  
    () => console.log('connected to db')
);


app.use('/', router)
// starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});