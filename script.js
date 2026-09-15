/* =========================================================
   GameVault — Interactividad (JavaScript nativo)
   Índice:
   1. Arranque (DOMContentLoaded)
   2. Detalle de producto expandible (DOM + click)
   3. Resaltado de catálogo (mouseover / mouseout)
   4. Formulario de contacto (submit)
   5. Puntuaciones — Fetch API
   ========================================================= */

/* -------------------- 1. Arranque -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initProductDetails();
  initCardHighlight();
  initContactForm();
  initScoresSection();
});

/* -------------------- 2. Detalle de producto expandible -------------------- */
// Engancha el evento click de cada botón "Ver detalles" a su card correspondiente.
function initProductDetails() {
  const detailButtons = document.querySelectorAll("[data-toggle-detail]");
  detailButtons.forEach((button) => {
    button.addEventListener("click", () => toggleProductDetail(button));
  });
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

/* -------------------- 3. Resaltado de catálogo -------------------- */
// Agrega/quita la clase .is-highlighted en cada card al pasar el mouse.
function initCardHighlight() {
  const cards = document.querySelectorAll("#catalogo .product-card");
  cards.forEach((card) => {
    card.addEventListener("mouseover", () => card.classList.add("is-highlighted"));
    card.addEventListener("mouseout", () => card.classList.remove("is-highlighted"));
  });
}

/* -------------------- 4. Formulario de contacto -------------------- */
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

/* -------------------- 5. Puntuaciones (Fetch API) -------------------- */
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
    listEl.innerHTML = "";
    renderScoresError(resultEl, error);
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
function renderScoresError(resultEl, error) {
  resultEl.innerHTML = "";

  const message = document.createElement("p");
  message.className = "scores-error";
  message.textContent = `No se pudieron cargar las puntuaciones (${error.message}).`;

  const retryButton = document.createElement("button");
  retryButton.type = "button";
  retryButton.className = "btn btn-outline-primary btn-sm";
  retryButton.textContent = "Reintentar";
  retryButton.addEventListener("click", loadScores);

  resultEl.appendChild(message);
  resultEl.appendChild(retryButton);
}
