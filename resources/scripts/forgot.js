const btn = document.getElementById("btnPassword");
const email = document.getElementById("usrEmail");
const direccionAuth = "http://localhost:3000/actions/change-password/";
let serverMail = "elias.velazquez7139@alumnos.udg.mx";

btn.addEventListener("click", function (e) {

  fetch(direccionAuth + email.value, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((respuesta) => {
      enviarCorreo(email.value, respuesta.password);
      alert("Contraseña enviada con éxito");
    })
    .catch((error) => alert(error));
});

function enviarCorreo(mail, password) {
  console.log(mail + " " + password);
  Email.send({
    SecureToken: "d066e4c7-b04a-4e2c-a4a2-75128f05a6ce",
    To: mail,
    From: serverMail,
    Subject: "Aquí tienes tu contraseña de vuelta, no la vayas a perder",
    Body: "This is your password:" + password,
  }).then((message) => alert(message));
}
