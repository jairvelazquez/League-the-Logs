const express = require("express");
const mongoose = require("mongoose");
//const cors = require("cors");
const path = require("path");
const app = express();
const router = express.Router();
const auth = require("./middlewares/auth.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv/config");
app.use(
  "/resources/views/partials",
  express.static(__dirname + "/resources/views/partials")
);
app.use("/img", express.static(__dirname + "/img"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/scss", express.static(__dirname + "/scss"));
app.use("/vendor", express.static(__dirname + "/vendor"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/scripts", express.static(__dirname + "/resources/scripts"));
app.use("/middlewares", express.static(__dirname + "/middlewares"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/resources/views"));
app.set("port", process.env.PORT || 3000);
//app.use(cors());

router.get("/", function (req, res) {
  res.render("index");
});
router.get("/404.html", function (req, res) {
  res.render("404");
});
router.get("/blank.html", function (req, res) {
  res.render("blank");
});
router.get("/buttons.html", function (req, res) {
  res.render("buttons");
});
router.get("/cards.html", function (req, res) {
  res.render("cards");
});
router.get("/charts.html", function (req, res) {
  res.render("charts");
});
router.get("/dashboard.html", function (req, res) {
  if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }
  if (localStorage.getItem("token") === null) {
    res.redirect("/");
  } else {
    res.render("dashboard");
  }
});
router.get("/forgot-password.html", function (req, res) {
  res.render("forgot-password");
});
router.get("/register.html", function (req, res) {
  res.render("register");
});
router.get("/tables.html", function (req, res) {
  res.render("tables");
});
router.get("/utilities-animation.html", function (req, res) {
  res.render("utilities-animation");
});
router.get("/utilities-border.html", function (req, res) {
  res.render("utilities-border");
});
router.get("/utilities-color.html", function (req, res) {
  res.render("utilities-color");
});
router.get("/utilities-other.html", function (req, res) {
  res.render("utilities-other");
});
router.get("/index.html", function (req, res) {
  res.render("index");
});
router.get("/profile.html", function (req, res) {
  res.render("profile");
});
const autorizado = require("./middlewares/auth.js");
router.get("/auth", autorizado);

const BansRoutes = require("./routes/BanRoutes");
app.use("/bans", BansRoutes);
const ChampionsRoutes = require("./routes/ChampionsRoutes");
app.use("/champion", ChampionsRoutes);
const DamageRoutes = require("./routes/DamageRoutes");
app.use("/damage", DamageRoutes);
const GamesRoutes = require("./routes/GamesRoutes");
app.use("/games", GamesRoutes);
const ObjectivesRoutes = require("./routes/ObjectivesRoutes");
app.use("/objectives", ObjectivesRoutes);
const SummonerGamesRoutes = require("./routes/SummonerGamesRoutes");
app.use("/summonergames", SummonerGamesRoutes);
const SummonerRoutes = require("./routes/SummonerRoutes");
app.use("/summoner", SummonerRoutes);
const TeamsRoutes = require("./routes/TeamsRoutes");
app.use("/teams", TeamsRoutes);
const TopPlayersRouters = require("./routes/TopPlayersRouters");
app.use("/tops", TopPlayersRouters);
const UserRoutes = require("./routes/UserRoutes");
app.use("/user", UserRoutes);
const ImagesRoutes = require("./routes/ImagesRoutes");
app.use("/imgs", ImagesRoutes);
const Auth = require('./routes/AuthRoutes');
app.use('/leave', Auth);
const Tables = require('./routes/TableRoutes');
app.use("/tables",Tables);


const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", router);
// starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
