const express = require("express")
path = require("path")
const app = express();
const router = express.Router();
app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/resources/views/index.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/img/AurelionSol_0.jpg',function(req,res){
    res.sendFile(path.join(__dirname+'/img/AurelionSol_0.jpg'));
    //__dirname : It will resolve to your project folder.
});

app.use('/', router)
// starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});