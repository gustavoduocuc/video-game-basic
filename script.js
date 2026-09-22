/* =========================================================
   GameVault — Interactividad (JavaScript nativo)
   Índice:
   1. Arranque (DOMContentLoaded)
   2. Catálogo de productos — Fetch API
   3. Interacciones del catálogo (detalle, resaltado, agregar al carrito)
   4. Búsqueda y categorías del navbar
   5. Carrito de compras
   6. Formulario de contacto (submit)
   7. Puntuaciones — Fetch API
   ========================================================= */

/* -------------------- 1. Arranque -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initProductCatalog();
  initCatalogInteractions();
  initStorefrontFilters();
  initCartInteractions();
  initContactForm();
  initScoresSection();
  renderCartSummary();
});

/* -------------------- 2. Catálogo de productos (Fetch API) -------------------- */
const PRODUCTS_URL = "assets/data/products.json";
let allProducts = [];

// Punto de entrada: dispara la primera carga del catálogo.
function initProductCatalog() {
  loadProducts();
}

// Solicita products.json, muestra el estado de carga y delega en éxito/error.
async function loadProducts() {
  const resultEl = document.getElementById("catalogo-resultado");
  const listEl = document.getElementById("catalogo-lista");

  listEl.innerHTML = "";
  renderCatalogLoading(resultEl);

  try {
    const response = await fetch(PRODUCTS_URL);
    if (!response.ok) {
      throw new Error(`Respuesta no exitosa del servidor (status ${response.status})`);
    }
    allProducts = await response.json();
    renderProductGrid(allProducts, "No hay productos disponibles en este momento.");
  } catch (error) {
    // El detalle técnico es para el desarrollador (consola); el usuario ve un mensaje amigable.
    console.error("[GameVault] No se pudo cargar el catálogo:", error);
    listEl.innerHTML = "";
    renderCatalogError(resultEl);
  }
}

// Muestra el indicador de carga mientras la solicitud está en curso.
function renderCatalogLoading(resultEl) {
  resultEl.innerHTML = "";
  const loading = document.createElement("p");
  loading.className = "catalogo-loading";
  loading.textContent = "Cargando catálogo…";
  resultEl.appendChild(loading);
}

// Muestra el mensaje de error y un botón para reintentar la carga.
function renderCatalogError(resultEl) {
  resultEl.innerHTML = "";

  const message = document.createElement("p");
  message.className = "catalogo-error";
  message.textContent = "No pudimos cargar el catálogo en este momento. Por favor, inténtalo nuevamente en unos segundos.";

  const retryButton = document.createElement("button");
  retryButton.type = "button";
  retryButton.className = "btn btn-outline-primary btn-sm";
  retryButton.textContent = "Reintentar";
  retryButton.addEventListener("click", loadProducts);

  resultEl.appendChild(message);
  resultEl.appendChild(retryButton);
}

// Renderiza la grilla de productos recibida; muestra emptyMessage si la lista viene vacía.
function renderProductGrid(products, emptyMessage) {
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

// Construye la columna + card de un producto a partir de sus datos.
function createProductCardElement(product) {
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-lg-4";

  const article = document.createElement("article");
  article.className = "card h-100 product-card";
  article.id = product.id;

  const categoryBadge = document.createElement("span");
  categoryBadge.className = "badge text-bg-primary category-badge";
  categoryBadge.textContent = product.category;
  article.appendChild(categoryBadge);

  if (product.bestseller) {
    const bestsellerBadge = document.createElement("span");
    bestsellerBadge.className = "badge text-bg-danger bestseller-badge";
    bestsellerBadge.textContent = "Más vendido";
    article.appendChild(bestsellerBadge);
  }

  const img = document.createElement("img");
  img.src = product.image;
  img.className = "card-img-top";
  img.alt = product.imageAlt;
  img.width = 300;
  img.height = 400;
  article.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column";

  const title = document.createElement("h3");
  title.className = "card-title h5";
  title.textContent = product.name;
  cardBody.appendChild(title);

  const description = document.createElement("p");
  description.className = "card-text";
  description.textContent = product.description;
  cardBody.appendChild(description);

  const price = document.createElement("p");
  price.className = "card-text price mt-auto fw-bold";
  price.textContent = product.priceLabel;
  cardBody.appendChild(price);

  const detailButton = document.createElement("button");
  detailButton.type = "button";
  detailButton.className = "btn btn-primary";
  detailButton.setAttribute("data-toggle-detail", "");
  detailButton.dataset.detail = product.detail;
  detailButton.setAttribute("aria-expanded", "false");
  detailButton.setAttribute("aria-label", `Mostrar u ocultar detalles de ${product.name}`);
  detailButton.textContent = `Ver detalles de ${product.name}`;
  cardBody.appendChild(detailButton);

  const addToCartButton = document.createElement("button");
  addToCartButton.type = "button";
  addToCartButton.className = "btn btn-outline-primary mt-2";
  addToCartButton.setAttribute("data-add-to-cart", "");
  addToCartButton.dataset.productId = product.id;
  addToCartButton.setAttribute("aria-label", `Agregar ${product.name} al carrito`);
  addToCartButton.textContent = "Agregar al carrito";
  cardBody.appendChild(addToCartButton);

  article.appendChild(cardBody);
  col.appendChild(article);
  return col;
}

/* -------------------- 3. Interacciones del catálogo -------------------- */
// Engancha (una sola vez, por delegación) los eventos de las cards generadas dinámicamente:
// click (detalle / agregar al carrito) y mouseover/mouseout (resaltado).
function initCatalogInteractions() {
  const catalogList = document.getElementById("catalogo-lista");
  if (!catalogList) return;

  catalogList.addEventListener("click", handleCatalogClick);
  catalogList.addEventListener("mouseover", handleCatalogMouseOver);
  catalogList.addEventListener("mouseout", handleCatalogMouseOut);
}

// Resuelve un click dentro del catálogo: detalle de producto o agregar al carrito.
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

// Crea (la primera vez) y muestra/oculta el bloque de detalle de una card.
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

// Construye el nodo de detalle a partir del texto guardado en data-detail.
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

// Agrega la clase .is-highlighted a la card bajo el puntero.
function handleCatalogMouseOver(event) {
  const card = event.target.closest(".product-card");
  if (card) card.classList.add("is-highlighted");
}

// Quita la clase .is-highlighted al salir el puntero de la card.
function handleCatalogMouseOut(event) {
  const card = event.target.closest(".product-card");
  if (card) card.classList.remove("is-highlighted");
}

/* -------------------- 4. Búsqueda y categorías del navbar -------------------- */
let activeCategorySlug = "";
let activeSearchTerm = "";

// Engancha el submit/limpieza del buscador, el dropdown de categorías y el chip de filtro activo.
function initStorefrontFilters() {
  const searchForm = document.getElementById("navbar-search-form");
  if (searchForm) searchForm.addEventListener("submit", handleSearchSubmit);

  const searchInput = document.getElementById("navbar-search-input");
  if (searchInput) searchInput.addEventListener("input", handleSearchInput);

  const categoryMenu = document.getElementById("navbar-category-menu");
  if (categoryMenu) categoryMenu.addEventListener("click", handleCategoryMenuClick);

  const filterChip = document.getElementById("catalogo-filtro");
  if (filterChip) {
    filterChip.addEventListener("click", (event) => {
      if (event.target.closest("[data-clear-category]")) setCategoryFilter("");
    });
  }

  updateCategoryIndicator();
}

// Filtra el catálogo por el texto ingresado en el buscador del navbar.
function handleSearchSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("navbar-search-input");
  activeSearchTerm = input.value.trim().toLowerCase();
  applyFilters();
}

// Si el usuario vacía el campo (borrando o con la "x" del input), restaura el catálogo sin pedir "Buscar".
function handleSearchInput(event) {
  if (event.target.value.trim() === "" && activeSearchTerm !== "") {
    activeSearchTerm = "";
    applyFilters();
  }
}

// Filtra el catálogo por la categoría seleccionada en el dropdown del navbar.
function handleCategoryMenuClick(event) {
  const link = event.target.closest("[data-category-filter]");
  if (!link) return;

  event.preventDefault();
  setCategoryFilter(link.dataset.categoryFilter);
}

// Aplica (o quita, con slug vacío) el filtro de categoría y actualiza su indicador.
function setCategoryFilter(slug) {
  activeCategorySlug = slug;
  updateCategoryIndicator();
  applyFilters();
}

// Muestra la categoría activa: ítem marcado en el dropdown, ícono en el toggle y chip sobre el catálogo.
function updateCategoryIndicator() {
  const menuLinks = document.querySelectorAll("#navbar-category-menu [data-category-filter]");
  let activeLabel = "";

  menuLinks.forEach((link) => {
    const isActive = link.dataset.categoryFilter === activeCategorySlug;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
      activeLabel = link.textContent.trim();
    } else {
      link.removeAttribute("aria-current");
    }
  });

  document.getElementById("category-filter-icon").hidden = !activeCategorySlug;

  const chipEl = document.getElementById("catalogo-filtro");
  chipEl.innerHTML = "";
  chipEl.hidden = !activeCategorySlug;
  if (!activeCategorySlug) return;

  const chip = document.createElement("span");
  chip.className = "badge text-bg-primary category-filter-chip";
  chip.textContent = `Categoría: ${activeLabel}`;

  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.className = "btn btn-sm btn-link";
  clearButton.setAttribute("data-clear-category", "");
  clearButton.textContent = "Quitar filtro";

  chipEl.appendChild(chip);
  chipEl.appendChild(clearButton);
}

// Combina (AND) el filtro de categoría activo y el término de búsqueda activo sobre allProducts.
function applyFilters() {
  const filtered = allProducts.filter((product) => {
    const matchesCategory = !activeCategorySlug || product.categorySlug === activeCategorySlug;
    const matchesSearch = !activeSearchTerm || product.name.toLowerCase().includes(activeSearchTerm);
    return matchesCategory && matchesSearch;
  });

  renderProductGrid(filtered, "No se encontraron productos que coincidan con tu búsqueda.");
}

/* -------------------- 5. Carrito de compras -------------------- */
// Estado del carrito en memoria: { [productId]: { product, quantity } }
const cart = {};

// Agrega un producto al carrito, o incrementa su cantidad si ya estaba agregado.
function addToCart(productId) {
  const product = allProducts.find((item) => item.id === productId);
  if (!product) return;

  if (cart[productId]) {
    cart[productId].quantity += 1;
  } else {
    cart[productId] = { product, quantity: 1 };
  }

  renderCartSummary();
}

// Quita un producto del carrito por completo.
function removeFromCart(productId) {
  delete cart[productId];
  renderCartSummary();
}

// Engancha (por delegación) el click en los controles de "Quitar" del resumen del carrito.
function initCartInteractions() {
  const listEl = document.getElementById("cart-items-list");
  if (!listEl) return;

  listEl.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-from-cart]");
    if (removeButton) {
      removeFromCart(removeButton.dataset.productId);
    }
  });
}

// Repinta el resumen del carrito (líneas, total y contador del navbar) a partir del estado actual.
function renderCartSummary() {
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
  totalEl.textContent = `Total: $${total.toLocaleString("es-CL")} CLP`;
}

// Construye una línea del resumen del carrito con su control de "Quitar".
function createCartItemElement(product, quantity, subtotal) {
  const item = document.createElement("li");
  item.className = "cart-item d-flex justify-content-between align-items-center gap-2";

  const info = document.createElement("span");
  info.className = "cart-item-info";
  info.textContent = `${product.name} × ${quantity} — $${subtotal.toLocaleString("es-CL")} CLP`;
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

/* -------------------- 6. Formulario de contacto -------------------- */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Engancha el submit del formulario de contacto a su validación.
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", handleContactSubmit);
}

// Valida el formulario en submit; nunca recarga la página ni envía datos a un servidor (demo).
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const nameInput = form.elements["name"];
  const emailInput = form.elements["email"];
  const messageInput = form.elements["message"];
  const statusEl = document.getElementById("contact-form-status");

  const isNameValid = nameInput.value.trim().length > 0;
  const isEmailValid = EMAIL_PATTERN.test(emailInput.value.trim());
  const isMessageValid = messageInput.value.trim().length > 0;

  setFieldValidity(nameInput, isNameValid);
  setFieldValidity(emailInput, isEmailValid);
  setFieldValidity(messageInput, isMessageValid);

  if (!isNameValid || !isEmailValid || !isMessageValid) {
    showFormStatus(statusEl, "Revisa los campos marcados antes de enviar el formulario.", false);
    return;
  }

  showFormStatus(
    statusEl,
    `¡Gracias, ${nameInput.value.trim()}! Tu mensaje fue recibido (demostración: no se envía a un servidor real).`,
    true
  );
  form.reset();
  [nameInput, emailInput, messageInput].forEach((input) => setFieldValidity(input, true));
}

// Marca (o limpia) el estado inválido de un campo del formulario.
function setFieldValidity(input, isValid) {
  input.classList.toggle("is-invalid", !isValid);
}

// Actualiza el mensaje de estado del formulario (éxito o error).
function showFormStatus(statusEl, message, isSuccess) {
  statusEl.textContent = message;
  statusEl.classList.toggle("text-success", isSuccess);
  statusEl.classList.toggle("text-danger", !isSuccess);
}

/* -------------------- 7. Puntuaciones (Fetch API) -------------------- */
const SCORES_URL = "assets/data/scores.json";

// Punto de entrada: dispara la primera carga de puntuaciones.
function initScoresSection() {
  loadScores();
}

// Solicita scores.json, muestra el estado de carga y delega en éxito/error.
async function loadScores() {
  const resultEl = document.getElementById("puntuaciones-resultado");
  const listEl = document.getElementById("puntuaciones-lista");

  listEl.innerHTML = "";
  renderScoresLoading(resultEl);

  try {
    const response = await fetch(SCORES_URL);
    if (!response.ok) {
      throw new Error(`Respuesta no exitosa del servidor (status ${response.status})`);
    }
    const scores = await response.json();
    renderScoresList(listEl, scores);
    resultEl.innerHTML = "";
  } catch (error) {
    console.error("[GameVault] No se pudieron cargar las puntuaciones:", error);
    listEl.innerHTML = "";
    renderScoresError(resultEl);
  }
}

// Muestra el indicador de carga mientras la solicitud está en curso.
function renderScoresLoading(resultEl) {
  resultEl.innerHTML = "";
  const loading = document.createElement("p");
  loading.className = "scores-loading";
  loading.textContent = "Cargando puntuaciones…";
  resultEl.appendChild(loading);
}

// Genera dinámicamente un elemento de lista por cada puntuación recibida.
function renderScoresList(listEl, scores) {
  scores.forEach((score) => {
    const item = document.createElement("li");
    item.className = "scores-item";
    item.textContent = `${score.jugador} — ${score.juego}: ${score.puntaje.toLocaleString("es-CL")} pts`;
    listEl.appendChild(item);
  });
}

// Muestra el mensaje de error y un botón para reintentar la carga.
function renderScoresError(resultEl) {
  resultEl.innerHTML = "";

  const message = document.createElement("p");
  message.className = "scores-error";
  message.textContent = "No pudimos cargar las puntuaciones en este momento. Por favor, inténtalo nuevamente.";

  const retryButton = document.createElement("button");
  retryButton.type = "button";
  retryButton.className = "btn btn-outline-primary btn-sm";
  retryButton.textContent = "Reintentar";
  retryButton.addEventListener("click", loadScores);

  resultEl.appendChild(message);
  resultEl.appendChild(retryButton);
}
