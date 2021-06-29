const buttonReportes = document.getElementById("reportes")
const button = document.getElementById("btnLeave");
const button2 = document.getElementById("btnProfile");
const lblName = document.getElementById("profileName");
const direccionPeticion = "http://localhost:3000/user/";
const direccionPeticionSummonerGames = "http://localhost:3000//summonergames/";
const direccionAuth = "http://localhost:3000/actions";
const direccionAuth2 = "http://localhost:3000/actions/gettoken";
const direccionName = "http://localhost:3000/user/login"
const summonerName = "Itequiya";

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
      if(respuesta){
        document.location.href = "profile.html";
      }else{
        alert("No tienes acceso a esta página");
      }
    })
    .catch((error) => console.error("Error:", error));
});


buttonReportes.addEventListener("click", () => {
    modificaTotalPartidas();
    getCuadrosEstadisticos();
});

function modificaTotalPartidas(){
  
  fetch(direccionPeticion+summonerName, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((responseFromAPI) => {
      handleResponseFromUser(responseFromAPI);
    })
    .catch((error) => console.log("Error:",error));

}

function handleResponseFromUser(responseFromAPI){
  const textoCifra = document.getElementById("totalPartidas");
  const cifra = responseFromAPI.matchesRegister;
  textoCifra.innerHTML = cifra;
}

function getCuadrosEstadisticos(){
  fetch(direccionPeticionSummonerGames+summonerName, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((responseFromAPI) => {
      handleResponseFromSummonerGames(responseFromAPI.games);
    })
    .catch((error) => console.log("Error:",error));
}

function handleResponseFromSummonerGames(responseFromAPI){
    const promedioOro=0;
    const promedioVision=0;
    const winRate = 0;
    const partidas=responseFromAPI.length;
    for(let i=0;i<partidas;i++){
        promedioOro = promedioOro + responseFromAPI[i]
        promedioVision = promedioVision + responseFromAPI[i]
        winRate = responseFromAPI.win ? (winRate + 100) : (winRate)
    }
    promedioOro = promedioOro / partidas;
    promedioVision = promedioVision / partidas;
    winRate = winRate / partidas;
}