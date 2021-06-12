
const registerButton = document.getElementById("btnRegister");
let direccionPeticion = "http://localhost:3000/summoner/";

registerButton.addEventListener("click", () => {
    let userName = document.getElementById("userName").value;
    let email = document.getElementById("userEmail").value;
    let password = document.getElementById("password").value;
    let repeatPassword = document.getElementById("repeatPassword").value;
    let summonerName = userName;
    
    const isValid = validaCampos(userName,email,password,repeatPassword);
    const buildedBody = getBody(userName,email,password,repeatPassword);
    console.log(buildedBody);
    if(isValid){
    fetch(direccionPeticion, {
        method: "POST",
        body:buildedBody,
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
        
    }
    
});

function validaCampos(userName,email,password,repeatPassword){
    if(userName.length <=0 || email.length<=0 || password.length<=0 || repeatPassword.length<=0){
        alert("Uno o mas campos vacíos, verificar");
        return false;
    }
    if(password !== repeatPassword){
        alert("Las contraseñas no coinciden");
        return false;
    }
    else{
        return true;
    }
}

function getBody(userName,email,password,repeatPassword){
    return JSON.stringify({userName,email,password,repeatPassword});
}