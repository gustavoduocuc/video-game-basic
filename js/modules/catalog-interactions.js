// Coordina detalle, resaltado y agregado al carrito desde las cards.
import { addToCart } from "./cart.js";

export function initCatalogInteractions() {
  const catalogList = document.getElementById("catalogo-lista");
  if (!catalogList) return;

  catalogList.addEventListener("click", handleCatalogClick);
  catalogList.addEventListener("mouseover", handleCatalogMouseOver);
  catalogList.addEventListener("mouseout", handleCatalogMouseOut);
}

function handleCatalogClick(event) {
  const detailButton = event.target.closest("[data-toggle-detail]");
  if (detailButton) {
    toggleProductDetail(detailButton);
    return;
  }

  const addButton = event.target.closest("[data-add-to-cart]");
  if (addButton) {
    addToCart(addButton.dataset.productId);
  }
}

function toggleProductDetail(button) {
  const cardBody = button.closest(".card-body");
  let detail = cardBody.querySelector(".product-detail");

  if (!detail) {
    detail = createProductDetailElement(button.dataset.detail);
    cardBody.appendChild(detail);
  }

  const willShow = detail.hidden;
  detail.hidden = !willShow;
  button.setAttribute("aria-expanded", String(willShow));
}

function createProductDetailElement(detailText) {
  const detail = document.createElement("div");
  detail.className = "product-detail";

  const paragraph = document.createElement("p");
  paragraph.className = "product-detail-text";
  paragraph.textContent = detailText;

  detail.appendChild(paragraph);
  detail.hidden = true;
  return detail;
}

function handleCatalogMouseOver(event) {
  const card = event.target.closest(".product-card");
  if (card) card.classList.add("is-highlighted");
}

function handleCatalogMouseOut(event) {
  const card = event.target.closest(".product-card");
  if (card) card.classList.remove("is-highlighted");
}
