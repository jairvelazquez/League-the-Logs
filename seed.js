var faker = require("faker");
var Champions = require("./models/ChampionsModel");
var mongoose = require("mongoose");
//const uri = "mongodb+srv://root_roy:cowzEwl0lBU7dphZ@cluster0.iicdo.mongodb.net/test";
console.log("Entra aquí");
if (uri) {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  console.log("Entra aquí");
  var count = 0;
  var num_records = 100;

  for (var i = 0; i < num_records; i++) {
    Champions.create(
      {
        id_champion: faker.datatype.number(),
        champion_name: faker.datatype.number(),
      },
      function () {
        count++;
        if (count >= num_records) {
          mongoose.connection.close();
          console.log("Database Seeded");
        }
      }
    );
  }
}
