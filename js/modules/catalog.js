// Carga y renderiza el catálogo dinámico de productos.
import { state } from "../state.js";
import { fetchJson } from "../shared/http.js";
import { renderErrorWithRetry, renderLoading } from "../shared/status.js";
import { createProductCardElement } from "./product-card.js";

const PRODUCTS_URL = "assets/data/products.json";

export function initProductCatalog() {
  loadProducts();
}

export async function loadProducts() {
  const resultEl = document.getElementById("catalogo-resultado");
  const listEl = document.getElementById("catalogo-lista");

  listEl.innerHTML = "";
  renderLoading(resultEl, {
    className: "catalogo-loading",
    text: "Cargando catálogo…",
  });

  try {
    state.products = await fetchJson(PRODUCTS_URL);
    renderProductGrid(state.products, "No hay productos disponibles en este momento.");
  } catch (error) {
    console.error("[GameVault] No se pudo cargar el catálogo:", error);
    listEl.innerHTML = "";
    renderErrorWithRetry(resultEl, {
      className: "catalogo-error",
      message: "No pudimos cargar el catálogo en este momento. Por favor, inténtalo nuevamente en unos segundos.",
      onRetry: loadProducts,
    });
  }
}

export function renderProductGrid(products, emptyMessage) {
  const resultEl = document.getElementById("catalogo-resultado");
  const listEl = document.getElementById("catalogo-lista");

  listEl.innerHTML = "";

  if (products.length === 0) {
    resultEl.innerHTML = "";
    const empty = document.createElement("p");
    empty.className = "catalogo-empty";
    empty.textContent = emptyMessage;
    resultEl.appendChild(empty);
    return;
  }

  resultEl.innerHTML = "";
  products.forEach((product) => listEl.appendChild(createProductCardElement(product)));
}
