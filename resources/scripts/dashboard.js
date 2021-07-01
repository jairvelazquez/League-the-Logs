const buttonReportes = document.getElementById("reportes");
const button = document.getElementById("btnLeave");
const button2 = document.getElementById("btnProfile");
const lblName = document.getElementById("profileName");
const direccionPeticion = "http://localhost:3000/user/";
const direccionPeticionSummonerGames =
  "http://localhost:3000/summonergames/get-games-by-summoner/";
const direccionAuth = "http://localhost:3000/actions";
const direccionAuth2 = "http://localhost:3000/actions/gettoken";
const direccionName = "http://localhost:3000/user/login";
const summonerName = localStorage.getItem("username");

window.addEventListener("load", () => {
  const nombre = localStorage.getItem("username");
  lblName.innerHTML = nombre;
});

button.addEventListener("click", () => {
  fetch(direccionAuth, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((respuesta) => {
      localStorage.clear();
      console.log(respuesta);
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

buttonReportes.addEventListener("click", () => {
  modificaTotalPartidas();
  getCuadrosEstadisticos();
});

function modificaTotalPartidas() {
  fetch(direccionPeticion + summonerName, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((responseFromAPI) => {
      handleResponseFromUser(responseFromAPI);
    })
    .catch((error) => console.log("Error:", error));
}

function handleResponseFromUser(responseFromAPI) {
  try {
    const textoCifra = document.getElementById("totalPartidas");
    const cifra = responseFromAPI.matchesRegister;
    textoCifra.innerHTML = cifra;
  } catch (error) {
    console.log(error);
    textoCifra.innerHTML = "cifra desconocida";
  }
}

function getCuadrosEstadisticos() {
  fetch(direccionPeticionSummonerGames + summonerName, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((responseFromAPI) => {
      handleResponseFromSummonerGames(responseFromAPI.gamesBySummoner);
    })
    .catch((error) => console.log("Error:", error));
}

function handleResponseFromSummonerGames(responseFromAPI) {
  let promedioOro = 0;
  let promedioVision = 0;
  let winRate = 0;
  let partidas = responseFromAPI.length;
  const goldE = document.getElementById("goldEarned");
  const vision = document.getElementById("visionP");
  const winR = document.getElementById("winrate");
  const textoCifra = document.getElementById("totalPartidas");
  let ganadas = 0;
  let perdidas = 0;
  for (let i = 0; i < partidas; i++) {
    promedioOro = promedioOro + responseFromAPI[i].gold;
    promedioVision = promedioVision + responseFromAPI[i].vision;
    if(responseFromAPI[i].win){
      ganadas++;
    }else{
      perdidas--;
    }
    //responseFromAPI[i].win ? ganadas++ : perdidas--;
    winRate = responseFromAPI[i].win ? winRate + 100 : winRate;
  }
  promedioOro = promedioOro / partidas;
  promedioVision = promedioVision / partidas;
  winRate = winRate / partidas;
  goldE.innerHTML = promedioOro;
  vision.innerHTML = promedioVision;
  winR.innerHTML = winRate+"%";
  console.log(partidas);
  textoCifra.innerHTML = partidas;
}
