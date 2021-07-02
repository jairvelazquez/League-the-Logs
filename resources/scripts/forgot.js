const btn = document.getElementById("forgot-btn");
const email = document.getElementById("usrEmail");
const nueva = document.getElementById("newPassword");
const direccionAuth = "http://localhost:3000/actions/change-password/";

btn.addEventListener("click", function (e) {

  const password = { password: nueva.value };

  fetch(direccionAuth + email.value, {
    method: "PUT",
    body: JSON.stringify(password),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((respuesta) => {
      console.log(respuesta);
      alert(respuesta.mensaje);
    })
    .catch((error) => alert(respuesta.mensaje));
});
