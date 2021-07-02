const buttonGetTables = document.getElementById("btnMatches");
const summonerName = localStorage.getItem("username");
const direccionPeticion = "http://localhost:3000/tables/";
const direccionAuth = "http://localhost:3000/actions";
const direccionAuth2 = "http://localhost:3000/actions/gettoken";
const button = document.getElementById("btnLeave");
const button2 = document.getElementById("btnProfile");
const lblName = document.getElementById("summonerName");
const posicion = 0;
window.addEventListener("load", () => {
  const nombre = localStorage.getItem("username");
  lblName.innerHTML = nombre;
});
buttonGetTables.addEventListener("click", function () {
  fetch(direccionPeticion + summonerName, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((respuesta) => {
      handleResponse(respuesta.DataMatches);
      //console.log(respuesta);
    })
    .catch((error) => console.error("Error:", error));
});

button.addEventListener("click", () => {
  fetch(direccionAuth, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((respuesta) => {
      localStorage.clear();
      //console.log(respuesta);
      alert(respuesta.mensaje);
    })
    .catch((error) => console.error("Error:", error));
});

button2.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(direccionAuth2, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((respuesta) => {
      console.log(respuesta);
      if (respuesta) {
        document.location.href = "profile.html";
      } else {
        alert("No tienes acceso a esta página");
      }
    })
    .catch((error) => console.error("Error:", error));
});

function handleResponse(dataMatches) {
  //console.log(dataMatches);
  //console.log(dataMatches.length);
  for (let match of dataMatches) {
    console.log(match);

    let summoner = getSummoner(match);

    //console.log(summoner);

    let campeon =
      summoner.championName === 'undefined'
        ? "Campeon no disponible"
        : summoner.championName;

    let linea = parseLane(summoner.lane);

    let gano = getGano(match, posicion);

    let kda = getKda(summoner);

    let fecha = new Date(match.gameCreation).toLocaleDateString();

    let oroObtenido = summoner.goldEarned;

    fillTable(campeon, linea, gano, kda, fecha, oroObtenido);

    console.log("Campeon:" + campeon);
    console.log("Linea:" + linea);
    console.log("Resultado:" + gano);
    console.log("KDA:" + kda);
    console.log("Fecha PArtida:" + fecha);
    console.log("Oro Obtenido:" + oroObtenido);
  }
}
function getSummoner(dataMatch) {
  for (let participant of dataMatch.participants) {
    //console.log("se compara "+ participant.summonerName +" con "+summonerName);
    if (participant.summonerName === summonerName) {
      return participant;
    }
  }
}

function getGano(dataMatch, position) {
  let resultado;
  if (position < 5) {
    resultado = dataMatch.teams[0].win;
  } else {
    resultado = dataMatch.teams[1].win;
  }
  let resultadoString = resultado ? "Ganada" : "Perdida";
  return resultadoString;
}

function getKda(summoner) {
  let kda = "";
  kda = kda.concat(summoner.kills + "/");
  kda = kda.concat(summoner.deaths + "/");
  kda = kda.concat(summoner.assists);
  return kda;
}

function fillTable(campeon, linea, gano, kda, fecha, oroObtenido) {
  var fila =
    "<tr><td>" +
    campeon +
    "</td><td>" +
    linea +
    "</td><td>" +
    gano +
    "</td><td>" +
    kda +
    "</td><td>" +
    fecha +
    "</td><td>" +
    oroObtenido +
    "</td></tr>";

  var row = document.createElement("TR");
  row.innerHTML = fila;
  document.getElementById("table").appendChild(row);
}

function parseLane(lane) {
  let parsedLane;
  switch (lane) {
    case "BOTTOM":
      parsedLane = "Botlane";
      break;
    case "MIDDLE":
      parsedLane = "Midlane";
      break;
    case "TOP":
      parsedLane = "Top";
      break;
    case "JUNGLE":
      parsedLane = "Jungla";
      break;
    default:
      parsedLane = "ARAM";
  }
  return parsedLane;
}
