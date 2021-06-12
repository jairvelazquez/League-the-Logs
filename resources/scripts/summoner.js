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

button.addEventListener("click", () => {
    let userName = document.getElementById("userName");
    let email = document.getElementById("userEmail");
    let password = document.getElementById("password");
    let repeatPassword = document.getElementById("repeatPassword");
    let summonerName = userName;

    isValid = validaCampos(userName,email,password,repeatPassword);

    console.log(isValid);
    /*
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
        */
});

function validaPassword(password,repeatPassword){
    if(password != repeatPassword){
        alert("Las contraseñas no coinciden");
        return false;
    }
    else{
        return true;
    }
}
