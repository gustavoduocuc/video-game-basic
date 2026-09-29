// Punto de entrada del código vainilla restante: puntuaciones y formulario de contacto.
// El catálogo, los filtros y el carrito se inicializan desde src/main.jsx (React).
import { initContactForm } from "./modules/contact-form.js";
import { initScoresSection } from "./modules/scores.js";

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
  initScoresSection();
});
