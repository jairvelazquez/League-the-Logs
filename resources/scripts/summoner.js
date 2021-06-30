const button = document.getElementById("btnLogin");
const username = document.getElementById("summonerName");
const password = document.getElementById("password");

let direccionPeticion = "http://localhost:3000/user/login";
let direccionAuth = "http://localhost:3000/auth";

button.addEventListener("click", () => {
  let valida = validaCampos(username.value, password.value);
  if (valida === false) {
    return;
  }

  let data = {
    username: username.value,
    password: password.value,
  };

  fetch(direccionPeticion, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((responseFromAPI) => {
      console.log(responseFromAPI.userFound.username);
      if(localStorage.getItem("username")==null){
        localStorage.setItem("username", responseFromAPI.userFound.username);
      }
      console.log(responseFromAPI.token)
      handleResponse(responseFromAPI.token);
    })
    .catch((error) => console.error("Error:", error));
});

function validaCampos(username, password) {
  if (username.length <= 0 || password.length <= 0) {
    alert("Uno o mas campos vacíos, verificar");
    return false;
  }
}

function handleResponse(responseFromAPI) {
  console.log("token: "+responseFromAPI);

  fetch(direccionAuth, {
    method: "GET", // or 'PUT'
    headers: {
      "access-token": responseFromAPI,
    },
  })
    .then((res) => res.json())
    .then((respuesta) => {
      //console.log(respuesta);
    })
    .catch((error) => console.error("Error:", error));

  document.location.href = "dashboard.html";
}
