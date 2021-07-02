const buttonReportes = document.getElementById("reportes");
const button = document.getElementById("btnLeave");
const button2 = document.getElementById("btnProfile");
const lblName = document.getElementById("profileName");
const direccionPeticion = "http://localhost:3000/user/";
const direccionPeticionSummonerGames =
  "http://localhost:3000/summonergames/get-games-by-summoner/";
const direccionPeticionDamage = "http://localhost:3000/damage/get-damage-by-summoner/";
const direccionAuth = "http://localhost:3000/actions";
const direccionAuth2 = "http://localhost:3000/actions/gettoken";
const direccionName = "http://localhost:3000/user/login";
const summonerName = localStorage.getItem("username");
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
let labesForChart = [];
let dataForChart = [];

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
    if (responseFromAPI[i].win) {
      ganadas++;
    } else {
      perdidas--;
    }
    winRate = responseFromAPI[i].win ? winRate + 100 : winRate;
  }
  promedioOro = promedioOro / partidas;
  promedioVision = promedioVision / partidas;
  winRate = winRate / partidas;
  goldE.innerHTML = promedioOro.toFixed(2);
  vision.innerHTML = promedioVision.toFixed(2);
  winR.innerHTML = winRate.toFixed(2) + "%";
  textoCifra.innerHTML = partidas;
  fillGoldChart(responseFromAPI);
  fillDamageChart();
  fillLanesChart(responseFromAPI);
}
function fillLanesChart(responseFromAPI) {
  const botlane = document.getElementById("botlane");
  const jungle = document.getElementById("jungle");
  const mid = document.getElementById("mid");
  const top = document.getElementById("top");
  const barraBot = document.getElementById("barraBot");
  const barraJg = document.getElementById("barraJg");
  const barraMid = document.getElementById("barraMid");
  const barraTop = document.getElementById("barraTop");
  let partidasValidas = 0;
  let contadorBot = 0;
  let contadortp = 0;
  let contadormid = 0;
  let contadorjg = 0;
  for (let i = 0; i < responseFromAPI.length; i++) {
    switch (responseFromAPI[i].lane) {
      case "BOTTOM":
        contadorBot++;
        partidasValidas++;
        break;
      case "MIDDLE":
        contadormid++;
        partidasValidas++;
        break;
      case "TOP":
        contadortp++;
        partidasValidas++;
        break;
      case "JUNGLE":
        contadorjg++;
        partidasValidas++;
        break;
      default:
        break;
    }
  }
  let porcentajeBot = (contadorBot * 100) / partidasValidas;
  let porcentajeMid = (contadormid * 100) / partidasValidas;
  let porcentajeTop = (contadortp * 100) / partidasValidas;
  let porcentajeJg = (contadorjg * 100) / partidasValidas;

  botlane.innerHTML =porcentajeBot.toFixed(2);
  jungle.innerHTML = porcentajeJg.toFixed(2);
  mid.innerHTML = porcentajeMid.toFixed(2);
  top.innerHTML =porcentajeTop.toFixed(2);

  barraBot.setAttribute("style","width: ".concat(porcentajeBot.toString()+"%"));
  barraMid.setAttribute("style","width: ".concat(porcentajeMid.toString()+"%"));
  barraTop.setAttribute("style","width: ".concat(porcentajeTop.toString()+"%"));
  barraJg.setAttribute("style","width: ".concat(porcentajeJg.toString()+"%"));
}


function fillDamageChart() {
  fetch(direccionPeticionDamage + summonerName, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((responseFromAPI) => {
      handleResponseFromDamage(responseFromAPI.damageBySummoner);
    })
    .catch((error) => console.log("Error:", error));
}

function handleResponseFromDamage(responseFromAPI) {
  console.log(responseFromAPI);
  let magico = 0;
  let fisico = 0;
  let verdadero = 0;
  for (let i = 0; i < responseFromAPI.length; i++) {
    magico = magico + responseFromAPI[i].magicDamage;
    fisico = fisico + responseFromAPI[i].physicalDamage;
    verdadero = verdadero + responseFromAPI[i].trueDamage;
  }
  fillDamageTableWithData(magico, fisico, verdadero);
}
function fillDamageTableWithData(magico, fisico, verdadero) {
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Mágico", "Físico", "Verdadero"],
      datasets: [{
        data: [magico, fisico, verdadero],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
}

function fillGoldChart(summonerGames) {
  partidas = summonerGames.length;
  labesForChart = [];
  dataForChart = [];
  for (let i = 0; i < partidas; i++) {
    dataForChart.push(summonerGames[i].gold);
    labesForChart.push("Partida No." + (i + 1));
  }
  createChart();
}

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example
function createChart() {
  let chartForGold = document.getElementById("goldAreaChart");

  let myLineChart = new Chart(chartForGold, {
    type: 'line',
    data: {
      labels: labesForChart,
      datasets: [{
        label: "Oro ganado",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: dataForChart,
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return '$' + number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function (tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
          }
        }
      }
    }
  });
}
