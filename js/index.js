const botonMenu = document.getElementById("toggle-menu");
const listaNav = document.getElementById("lista-navegacion");

botonMenu.addEventListener("click", () => {
  listaNav.classList.toggle("activo");
});
