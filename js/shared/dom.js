// Utilidades mínimas para crear y vaciar elementos del DOM.
export function createElement(tag, options = {}) {
  const element = document.createElement(tag);

  if (options.className) element.className = options.className;
  if (options.text !== undefined) element.textContent = options.text;

  Object.entries(options.attrs ?? {}).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
  Object.entries(options.dataset ?? {}).forEach(([name, value]) => {
    element.dataset[name] = value;
  });

  return element;
}

export function clearElement(element) {
  element.innerHTML = "";
}
