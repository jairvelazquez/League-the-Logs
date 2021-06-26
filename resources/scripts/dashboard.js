const button = document.getElementById("btnLeave")

const direccionAuth = "http://localhost:3000/leave";

button.addEventListener("click", () => {

    fetch(direccionAuth, {
        method: "GET", 
      })
        .then((res) => res.json())
        .then((respuesta) => {
            console.log(respuesta);
            alert(respuesta.mensaje);
        })
        .catch((error) => console.error("Error:", error));
    
    
});