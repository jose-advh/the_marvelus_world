function crearCarrusel(config) {
  const lista = document.getElementById(config.listaId);
  const prevBtn = document.getElementById(config.prevBtnId);
  const nextBtn = document.getElementById(config.nextBtnId);
  const indicadores = document.getElementById(config.indicadoresId);

  let indice = 0;
  let tarjetasPorVista = 3;

  function actualizar() {
    const tarjetas = lista.querySelectorAll("." + config.claseTarjeta);
    const total = tarjetas.length;
    tarjetasPorVista = window.innerWidth <= 768 ? 1 : 3;
    const totalPaginas = Math.ceil(total / tarjetasPorVista);

    if (indice >= totalPaginas) indice = totalPaginas - 1;

    indicadores.innerHTML = "";
    for (let i = 0; i < totalPaginas; i++) {
      const punto = document.createElement("span");
      if (config.indicadoresId === "indicadores") {
        punto.classList.add("maravillas__punto");
        if (i === indice) punto.classList.add("maravillas__punto--activo");
      } else {
        punto.classList.add("actividades__punto");
        if (i === indice) punto.classList.add("activo");
      }

      indicadores.appendChild(punto);
    }

    if (tarjetasPorVista === 1) {
      lista.style.transform = `translateX(-${indice * 100}%)`;
    } else {
      const anchoTarjeta = tarjetas[0].offsetWidth + 20;
      const desplazamiento = anchoTarjeta * indice * tarjetasPorVista;
      lista.style.transform = `translateX(-${desplazamiento}px)`;
    }

    const puntos = indicadores.querySelectorAll("span");
    puntos.forEach((p, i) => {
      if (config.indicadoresId === "indicadores") {
        p.classList.toggle("maravillas__punto--activo", i === indice);
      } else {
        p.classList.toggle("activo", i === indice);
      }
    });
  }

  function avanzar() {
    const total = lista.querySelectorAll("." + config.claseTarjeta).length;
    const totalPaginas = Math.ceil(total / tarjetasPorVista);
    if (indice < totalPaginas - 1) {
      indice++;
      actualizar();
    }
  }

  function retroceder() {
    if (indice > 0) {
      indice--;
      actualizar();
    }
  }

  prevBtn.addEventListener("click", retroceder);
  nextBtn.addEventListener("click", avanzar);
  window.addEventListener("resize", () => setTimeout(actualizar, 200));
  window.addEventListener("load", actualizar);
}

crearCarrusel({
  listaId: "maravillas-lista",
  prevBtnId: "btn-prev",
  nextBtnId: "btn-next",
  indicadoresId: "indicadores",
  claseTarjeta: "maravillas__tarjeta",
});

crearCarrusel({
  listaId: "actividades-lista",
  prevBtnId: "actividades-prev",
  nextBtnId: "actividades-next",
  indicadoresId: "actividades-indicadores",
  claseTarjeta: "actividades__tarjeta",
});
