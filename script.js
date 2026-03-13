document.addEventListener("DOMContentLoaded", () => {

  const botonTema = document.getElementById("btn-tema");

  /* Controlador de interfaz */
  const UI = {
    cuerpo: document.body,

    alternarColor: function () {
      const estaOscuro = this.cuerpo.classList.toggle("tema-oscuro");
      localStorage.setItem("tema-preferido", estaOscuro ? "oscuro" : "claro");
      this.cuerpo.setAttribute("data-theme-set", "true");
      if (botonTema) botonTema.textContent = estaOscuro ? "Tema: Oscuro" : "Tema: Claro";
    },

    irASeccion: function (id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* Aplicar tema guardado */
  (function () {
    const guardado = localStorage.getItem("tema-preferido");
    if (guardado) {
      UI.cuerpo.setAttribute("data-theme-set", "true");
      if (guardado === "oscuro") UI.cuerpo.classList.add("tema-oscuro");
      else UI.cuerpo.classList.remove("tema-oscuro");
    }
    if (botonTema) {
      botonTema.textContent = UI.cuerpo.classList.contains("tema-oscuro") ? "Tema: Oscuro" : "Tema: Claro";
    }
  })();

  /* Botón tema */
  if (botonTema) {
    botonTema.addEventListener("click", () => UI.alternarColor());
  }

  /* Delegación de eventos en tarjetas de proyectos */
  const contenedorCards = document.querySelector(".cards-grid");
  if (contenedorCards) {
    contenedorCards.addEventListener("click", (evento) => {
      const tarjeta = evento.target.closest(".proyecto-card");
      if (tarjeta) {
        const h3 = tarjeta.querySelector("h3");
        const nombre = h3 ? h3.innerText : "Proyecto";
        alert("Proyecto seleccionado: " + nombre);
      }
    });
  }

  /* Scroll suave */
  document.querySelectorAll("[data-scroll]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      UI.irASeccion(link.getAttribute("data-scroll"));
    });
  });

});
