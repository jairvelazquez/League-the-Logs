const button = document.getElementById("btnLogin");
const registerButton = document.getElementById("btnRegister");

let direccionPeticion = "http://localhost:3000/summoner/";

let body;

button.addEventListener("click", () => {
    const summonerInput = document.getElementById("summonerName");
    direccionPeticion= direccionPeticion.concat(summonerInput.value);
    fetch(direccionPeticion, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (responseFromAPI) =>
            (console.log(responseFromAPI))
        )
        .catch((error) => console.error("Error:", error));
});

