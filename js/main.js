// Punto de entrada del código vainilla restante: puntuaciones.
// Navbar, catálogo, filtros, carrito y contacto se inicializan desde src/main.jsx (React).
import { initScoresSection } from "./modules/scores.js";

document.addEventListener("DOMContentLoaded", () => {
  initScoresSection();
});
