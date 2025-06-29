document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  if (usuario && password) {
    alert("Login exitoso! Redirigiendo...");
    window.location.href = "../index.html";
  } else {
    alert("Por favor, completa todos los campos.");
  }
});
