// Renderiza estados reutilizables de carga y error con reintento.
import { clearElement, createElement } from "./dom.js";

export function renderLoading(container, options) {
  clearElement(container);
  const loading = createElement("p", {
    className: options.className,
    text: options.text,
  });
  container.appendChild(loading);
}

export function renderErrorWithRetry(container, options) {
  clearElement(container);

  const message = createElement("p", {
    className: options.className,
    text: options.message,
  });

  const retryButton = document.createElement("button");
  retryButton.type = "button";
  retryButton.className = "btn btn-outline-primary btn-sm";
  retryButton.textContent = "Reintentar";
  retryButton.addEventListener("click", options.onRetry);

  container.appendChild(message);
  container.appendChild(retryButton);
}
