const button = document.getElementById("btnLeave");
const button2 = document.getElementById("btnProfile");
const lblName = document.getElementById("profileName");
const direccionAuth = "http://localhost:3000/actions";
const direccionAuth2 = "http://localhost:3000/actions/gettoken";
const direccionName = "http://localhost:3000/user/login"

window.addEventListener("load", () =>{
  const nombre = localStorage.getItem("username");
  lblName.innerHTML = nombre; 
})

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
