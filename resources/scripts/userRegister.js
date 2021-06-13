
const registerButton = document.getElementById("btnRegister");
let direccionPeticion = "http://localhost:3000/user/";
let buildedBody = {};


registerButton.addEventListener("click", () => {
    let userName = document.getElementById("userName").value;
    let email = document.getElementById("userEmail").value;
    let password = document.getElementById("password").value;
    let repeatPassword = document.getElementById("repeatPassword").value;
    let summonerName = userName;

    const isValid = validaCampos(userName,email,password,repeatPassword);
    console.log(buildedBody);
    if(isValid){
    fetch(direccionPeticion, {
        method: "POST",
        body:buildedBody,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(
          (responseFromAPI) =>
            (verifyResponse(responseFromAPI))
        )
        .catch((error) => console.log(error));
        
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
        buildedBody = getBody(userName,email,password);
        return true;
    }
}

function getBody(username,email,password){
    return JSON.stringify({username,email,password});
}

function verifyResponse (responseFromAPI){
    if(responseFromAPI.status == 200){
        alert("Registro Correcto");
    }
    setTimeout (2000);
    document.location.href = "index.html";
}