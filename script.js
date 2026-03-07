// =============================================
// PORTAFOLIO – Jose Mamani
// Conceptos aplicados de clase:
// - DOMContentLoaded: espera a que el DOM esté construido
// - Selectores: getElementById, querySelector, querySelectorAll
// - addEventListener: escuchadores de eventos (click)
// - Closures: variables privadas dentro de funciones
// - forEach: recorrer NodeList
// - localStorage: persistir preferencia del usuario
// - classList.toggle: alternar clases CSS (buena práctica)
// - Delegación de eventos (event bubbling) con closest()
// - Funciones flecha (arrow functions) de ES6
// - Template literals (comillas invertidas) de ES6
// - const y let (scope de bloque) de ES6
// - Objetos y arrays como tipos complejos
// =============================================

document.addEventListener("DOMContentLoaded", () => {

  // =============================================
  // CONTROLADOR DE INTERFAZ (Patrón Módulo)
  // Encapsula toda la lógica visual en un objeto
  // =============================================
  const botonTema = document.getElementById("btn-tema");

  const UI = {
    cuerpo: document.body,

    // Alterna tema usando classList.toggle (buena práctica de clase)
    alternarColor: function () {
      const CLASE_OSCURO = "tema-oscuro";
      const LS_TEMA = "tema-preferido";

      const estaOscuro = this.cuerpo.classList.toggle(CLASE_OSCURO);
      localStorage.setItem(LS_TEMA, estaOscuro ? "oscuro" : "claro");
      this.cuerpo.setAttribute("data-theme-set", "true");

      if (botonTema) botonTema.textContent = estaOscuro ? "Tema: Oscuro" : "Tema: Claro";
    },

    // Scroll suave a sección
    irASeccion: function (id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // =============================================
  // APLICAR TEMA GUARDADO (localStorage + IIFE)
  // =============================================
  (function aplicarTemaInicial() {
    const LS_TEMA = "tema-preferido";
    const CLASE_OSCURO = "tema-oscuro";
    const guardado = localStorage.getItem(LS_TEMA);

    if (guardado) {
      UI.cuerpo.setAttribute("data-theme-set", "true");
      if (guardado === "oscuro") {
        UI.cuerpo.classList.add(CLASE_OSCURO);
      } else {
        UI.cuerpo.classList.remove(CLASE_OSCURO);
      }
    }

    if (botonTema) {
      const esOscuro = UI.cuerpo.classList.contains(CLASE_OSCURO);
      botonTema.textContent = esOscuro ? "Tema: Oscuro" : "Tema: Claro";
    }
  })();

  // =============================================
  // EVENTO: Click en botón tema
  // =============================================
  if (botonTema) {
    botonTema.addEventListener("click", () => UI.alternarColor());
  }

  // =============================================
  // DELEGACIÓN DE EVENTOS (Event Bubbling)
  // Un solo listener en el padre para todas las tarjetas
  // =============================================
  const contenedorCards = document.querySelector(".cards-grid");
  if (contenedorCards) {
    contenedorCards.addEventListener("click", (evento) => {
      const tarjeta = evento.target.closest(".proyecto-card");
      if (tarjeta) {
        const h3 = tarjeta.querySelector("h3");
        const nombre = h3 ? h3.innerText : "Proyecto";
        alert(`Has hecho clic en: ${nombre}`);
      }
    });
  }

  // Fallback para tarjetas sueltas
  const tarjetasSueltas = document.querySelectorAll(".proyecto-card");
  if (!contenedorCards && tarjetasSueltas.length > 0) {
    tarjetasSueltas.forEach((tarjeta) => {
      tarjeta.addEventListener("click", () => {
        const h3 = tarjeta.querySelector("h3");
        const nombre = h3 ? h3.innerText : "Proyecto";
        alert("Has hecho clic en el proyecto: " + nombre);
      });
    });
  }

  // =============================================
  // SCROLL SUAVE (selector de atributo [data-scroll])
  // =============================================
  const linksScroll = document.querySelectorAll("[data-scroll]");
  linksScroll.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("data-scroll");
      UI.irASeccion(id);
    });
  });

  // =============================================
  // VARIABLES DE EJEMPLO (tipos de datos)
  // =============================================
  const nombreDev = "Jose Mamani";
  let proyectosCompletados = 4;
  let esProfesional = true;
  const edad = 35;
  const saludo = `Hola, soy ${nombreDev}`;

  const habilidades = ["JavaScript", "HTML", "CSS", "Node.js", "Google Apps Script"];
  const experiencia = { años: 9, empresas: ["HANSA Ltda.", "DATARED GROUP"] };

  const proyectoNuevo = {
    nombre: "Portafolio Personal",
    descripcion: "Sitio web multipágina con HTML, CSS y JavaScript.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    completado: true
  };

  // =============================================
  // CLOSURE + SCOPE (ejemplo de clase)
  // =============================================
  function crearContadorProyectos(inicio) {
    let contador = inicio;
    return {
      incrementar: () => { contador++; return `Ahora tienes ${contador} proyectos`; },
      obtenerTotal: () => contador
    };
  }

  const miContador = crearContadorProyectos(proyectosCompletados);
});