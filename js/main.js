// Punto de entrada: inicializa GameVault en el mismo orden del script original.
import { initProductCatalog } from "./modules/catalog.js";
import { initCatalogInteractions } from "./modules/catalog-interactions.js";
import { initStorefrontFilters } from "./modules/filters.js";
import { initCartInteractions, renderCartSummary } from "./modules/cart.js";
import { initContactForm } from "./modules/contact-form.js";
import { initScoresSection } from "./modules/scores.js";

document.addEventListener("DOMContentLoaded", () => {
  initProductCatalog();
  initCatalogInteractions();
  initStorefrontFilters();
  initCartInteractions();
  initContactForm();
  initScoresSection();
  renderCartSummary();
});
