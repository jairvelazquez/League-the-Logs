var faker = require("faker");
var Champions = require("./models/ChampionsModel");
var mongoose = require("mongoose");
const uri = "mongodb+srv://root_jair:9vB2T0XzD2Z1tfyk@cluster0.a98v9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority2";
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
