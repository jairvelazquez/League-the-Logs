const button = document.getElementById("btnLogin");
const username = document.getElementById("summonerName");
const password = document.getElementById("password");

let direccionPeticion = "http://localhost:3000/user/login";
let direccionAuth = "http://localhost:3000/auth";

button.addEventListener("click", () => {
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
      //console.log(responseFromAPI.token)
      handleResponse(responseFromAPI.token);
    })
    .catch((error) => console.error("Error:", error));
});

function handleResponse(responseFromAPI) {
  //console.log("token: "+responseFromAPI);

  fetch(direccionAuth, {
    method: "GET", // or 'PUT'
    headers: {
      "access-token": responseFromAPI,
    },
  })
    .then((res) => res.json())
    .then((respuesta) => {
      console.log(respuesta);
    })
    .catch((error) => console.error("Error:", error));
  //document.location.href = "dashboard.html";
}
