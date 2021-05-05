const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const router = express.Router();
require('dotenv/config');
app.use(express.urlencoded({ extended: false }));
app.use('/resources/views/partials', express.static(__dirname + '/resources/views/partials'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/scss', express.static(__dirname + '/scss'));
app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/js', express.static(__dirname + '/js'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/resources/views'));
app.set("port", process.env.PORT || 3000);

router.get('/',function(req,res){
    res.render('index');
});
router.get('/dashboard.html',function(req,res){
    res.render('dashboard');
});
router.get('/404.html',function(req,res){
    res.render('404');
});
router.get('/blank.html',function(req,res){
    res.render('blank');
});
router.get('/buttons.html',function(req,res){
    res.render('buttons');
});
router.get('/cards.html',function(req,res){
    res.render('cards');
});
router.get('/charts.html',function(req,res){
    res.render('charts');
});
router.get('/dashboard.html',function(req,res){
    res.render('dashboard');
});
router.get('/forgot-password.html',function(req,res){
    res.render('forgot-password');
});
router.get('/register.html',function(req,res){
    res.render('register');
});
router.get('/tables.html',function(req,res){
    res.render('tables');
});
router.get('/utilities-animation.html',function(req,res){
    res.render('utilities-animation');
});
router.get('/utilities-border.html',function(req,res){
    res.render('utilities-border');
});
router.get('/utilities-color.html',function(req,res){
    res.render('utilities-color');
});
router.get('/utilities-other.html',function(req,res){
    res.render('utilities-other');
});
router.get('/index.html',function(req,res){
    res.render('index');
});
const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
const db = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', router)
// starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});