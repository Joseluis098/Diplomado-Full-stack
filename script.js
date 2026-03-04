document.addEventListener("DOMContentLoaded", () => {
  const botonTema = document.getElementById("btn-tema");
  const cuerpoPagina = document.body;

  const CLASE_OSCURO = "tema-oscuro";
  const LS_TEMA = "tema-preferido";

  function actualizarTexto(oscuro) {
    if (!botonTema) return;
    botonTema.textContent = oscuro ? "Tema: Oscuro" : "Tema: Claro";
  }

  const guardado = localStorage.getItem(LS_TEMA);
  const iniciarOscuro = guardado === "oscuro";

  if (iniciarOscuro) cuerpoPagina.classList.add(CLASE_OSCURO);
  else cuerpoPagina.classList.remove(CLASE_OSCURO);

  actualizarTexto(iniciarOscuro);

  function alternarTema() {
    const estaOscuro = cuerpoPagina.classList.toggle(CLASE_OSCURO);
    localStorage.setItem(LS_TEMA, estaOscuro ? "oscuro" : "claro");
    actualizarTexto(estaOscuro);
  }

  if (botonTema) botonTema.addEventListener("click", alternarTema);

  // alerta proyectos (solo si existe)
  const tarjetas = document.querySelectorAll(".proyecto-card");
  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
      const h3 = tarjeta.querySelector("h3");
      alert("Has hecho clic en el proyecto: " + (h3 ? h3.innerText : "Proyecto"));
    });
  });
});