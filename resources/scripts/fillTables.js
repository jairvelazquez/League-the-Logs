
const buttonGetTables = document.getElementById("btnMatches");
const summonerName = "elvuelodeicaro";
const direccionPeticion = "http://localhost:3000/tables/";

buttonGetTables.addEventListener("click", function () {
  fetch(direccionPeticion + summonerName, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((respuesta) => {
      console.log(respuesta);
    })
    .catch((error) => console.error("Error:", error));

});
