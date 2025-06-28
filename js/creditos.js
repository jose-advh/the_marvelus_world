// Datos del equipo de desarrollo
const equipoDesarrollo = [
  {
    nombre: "Isaac Bolaños",
    rol: "Líder de Desarrollo",
    descripcion:
      "Encargado del desarrollo de la página principal y arquitectura del sitio",
    foto: "../media/fotos/isaac.png",
    skills: ["HTML5", "CSS3"],
  },
  {
    nombre: "Carlos de La Cruz",
    rol: "Desarrollador Frontend",
    descripcion:
      "Encargado de la funcionalidad del sitio web manejando Javascript",
    foto: "../media/fotos/carlos.webp",
    skills: ["JavaScript", "CSS3", "HTML5"],
  },
  {
    nombre: "Juan Hernandez",
    rol: "Desarrollador Fronted",
    descripcion: "Encargado del diseño y desarrollo de la pagina de ofertas",
    foto: "../media/fotos/juan.png",
    skills: ["HTML5", "CSS3"],
  },
  {
    nombre: "Deivis Caballero",
    rol: "UX/UI Designer",
    descripcion:
      "Encargado del diseño del sitio web y su arquitectura junto al diseño de layouts",
    foto: "../media/fotos/deivis.webp",
    skills: ["Canva", "HTML5", "CSS3"],
  },
  {
    nombre: "Sebastián Escobar",
    rol: "Desarrollador Frontend y Tester",
    descripcion:
      "Encargado de realizar multiples pruebas en diferentes navegadores y dispositivos para asegurar la correcta funcionalidad del sitio web.",
    foto: "../media/fotos/sebastian.jpeg",
    skills: ["Testing", "HTML5", "CSS3"],
  },
  {
    nombre: "Alfonso Roncayo",
    rol: "Desarrollador Frontend",
    descripcion:
      "Encargado del desarrollo de la pagina de creditos y busqueda de imagenes",
    foto: "../media/fotos/alfonso.webp",
    skills: ["HTML5", "CSS3"],
  },
];

// Función para crear las cards del equipo
function crearCardsEquipo() {
  const gridEquipo = document.getElementById("grid-equipo");

  equipoDesarrollo.forEach((miembro, index) => {
    const card = document.createElement("article");
    card.className = "card-miembro";
    card.setAttribute("role", "article");
    card.setAttribute("aria-label", `Información de ${miembro.nombre}`);

    // Crear skills HTML
    const skillsHTML = miembro.skills
      .map((skill) => `<span class="skill-tag">${skill}</span>`)
      .join("");

    card.innerHTML = `
                    <img src="${miembro.foto}" alt="Foto de ${miembro.nombre}" class="foto-miembro" loading="lazy">
                    <div class="info-miembro">
                        <h3 class="nombre-miembro">${miembro.nombre}</h3>
                        <p class="rol-miembro">${miembro.rol}</p>
                        <p class="descripcion-miembro">${miembro.descripcion}</p>
                        <div class="skills-miembro">
                            ${skillsHTML}
                        </div>
                    </div>
                `;

    // Añadir animación de entrada escalonada
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    gridEquipo.appendChild(card);

    // Animar la entrada de cada card
    setTimeout(() => {
      card.style.transition = "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 150);
  });
}

// Función para el menú móvil
function inicializarMenuMovil() {
  const toggleMenu = document.getElementById("toggle-menu");
  const listaNavegacion = document.getElementById("lista-navegacion");

  if (toggleMenu && listaNavegacion) {
    toggleMenu.addEventListener("click", () => {
      listaNavegacion.classList.toggle("activo");

      // Cambiar ícono del menú
      if (listaNavegacion.classList.contains("activo")) {
        toggleMenu.innerHTML = "&#10005;"; // X
      } else {
        toggleMenu.innerHTML = "&#9776;"; // Hamburguesa
      }
    });

    // Cerrar menú al hacer clic en un enlace
    const enlaces = listaNavegacion.querySelectorAll(".enlace-header");
    enlaces.forEach((enlace) => {
      enlace.addEventListener("click", () => {
        listaNavegacion.classList.remove("activo");
        toggleMenu.innerHTML = "&#9776;";
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (
        !toggleMenu.contains(e.target) &&
        !listaNavegacion.contains(e.target)
      ) {
        listaNavegacion.classList.remove("activo");
        toggleMenu.innerHTML = "&#9776;";
      }
    });
  }
}

// Función para lazy loading de imágenes
function inicializarLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Función para añadir efectos de scroll
function inicializarEfectosScroll() {
  window.addEventListener("scroll", () => {
    const cards = document.querySelectorAll(".card-miembro");

    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      const triggerBottom = window.innerHeight * 0.8;

      if (cardTop < triggerBottom) {
        card.style.transform = "translateY(0)";
        card.style.opacity = "1";
      }
    });
  });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  crearCardsEquipo();
  inicializarMenuMovil();
  inicializarLazyLoading();
  inicializarEfectosScroll();

  // Añadir clase para animaciones CSS después de cargar
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});

// Optimización para dispositivos táctiles
if ("ontouchstart" in window) {
  document.body.classList.add("touch-device");
}
