var faker = require("faker");
var Champions = require("./models/ChampionsModel");
var mongoose = require("mongoose");
const uri = "mongodb+srv://root_roy:cowzEwl0lBU7dphZ@cluster0.iicdo.mongodb.net/test";
if (uri) {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  var count = 0;
  var num_records = 20;

  for (var i = 0; i < num_records; i++) {
    const champ = new Champions(
      {
        id_champion: faker.datatype.number(),
        champion_name: faker.datatype.number(),
      },
    );
    champ.save();
    console.log("ID campeon: "+ champ.id_champion);
    count++;
    if (count >= num_records) {
      //mongoose.connection.close();
      console.log("Database Seeded");
    }
  }
}