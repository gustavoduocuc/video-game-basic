// Gestiona el estado privado y la representación del carrito.
import { state } from "../state.js";
import { formatNumberCL } from "../shared/format.js";

const cart = {};

export function addToCart(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;

  if (cart[productId]) {
    cart[productId].quantity += 1;
  } else {
    cart[productId] = { product, quantity: 1 };
  }

  renderCartSummary();
}

export function removeFromCart(productId) {
  delete cart[productId];
  renderCartSummary();
}

export function initCartInteractions() {
  const listEl = document.getElementById("cart-items-list");
  if (!listEl) return;

  listEl.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-from-cart]");
    if (removeButton) {
      removeFromCart(removeButton.dataset.productId);
    }
  });
}

export function renderCartSummary() {
  const listEl = document.getElementById("cart-items-list");
  const emptyEl = document.getElementById("cart-empty-message");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");

  const items = Object.values(cart);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  countEl.textContent = String(totalItems);

  listEl.innerHTML = "";

  if (items.length === 0) {
    emptyEl.hidden = false;
    totalEl.hidden = true;
    totalEl.textContent = "";
    return;
  }

  emptyEl.hidden = true;

  let total = 0;
  items.forEach(({ product, quantity }) => {
    const subtotal = product.price * quantity;
    total += subtotal;
    listEl.appendChild(createCartItemElement(product, quantity, subtotal));
  });

  totalEl.hidden = false;
  totalEl.textContent = `Total: $${formatNumberCL(total)} CLP`;
}

function createCartItemElement(product, quantity, subtotal) {
  const item = document.createElement("li");
  item.className = "cart-item d-flex justify-content-between align-items-center gap-2";

  const info = document.createElement("span");
  info.className = "cart-item-info";
  info.textContent = `${product.name} × ${quantity} — $${formatNumberCL(subtotal)} CLP`;
  item.appendChild(info);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "btn btn-sm btn-outline-danger";
  removeButton.setAttribute("data-remove-from-cart", "");
  removeButton.dataset.productId = product.id;
  removeButton.setAttribute("aria-label", `Quitar ${product.name} del carrito`);
  removeButton.textContent = "Quitar";
  item.appendChild(removeButton);

  return item;
}
