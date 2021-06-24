const button = document.getElementById("btnLogin");
const username = document.getElementById("summonerName");
const password = document.getElementById("password");

let direccionPeticion = "http://localhost:3000/user/login";
let direccionAuth = "http://localhost:3000/dashboard.html";

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
    .then((responseFromAPI) => handleResponse(responseFromAPI))
    .catch((error) => console.error("Error:", error));
});

function handleResponse(responseFromAPI) {
  console.log(responseFromAPI);
  let myHeaders = new Headers();
  myHeaders.append('access-token', responseFromAPI.token);
  //document.location.href = "dashboard.html";
}
