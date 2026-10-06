import { formatNumberCL } from "../utils/format.js";

// Con data-bs-dismiss, Bootstrap resuelve el destino por el href (#catalogo) en vez del offcanvas,
// así que ni cierra el panel ni navega. Se cierra explícitamente y el scroll se hace al terminar
// de ocultarse (antes el offcanvas aún bloquea el scroll del body).
function closeCartAndGoToCatalog(event) {
  event.preventDefault();
  const panel = event.currentTarget.closest(".offcanvas");
  const catalog = document.getElementById("catalogo");
  if (!catalog) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scroll = () =>
    catalog.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "start" });
  const instance = panel && window.bootstrap?.Offcanvas.getInstance(panel);
  if (!instance) return scroll();
  panel.addEventListener("hidden.bs.offcanvas", scroll, { once: true });
  instance.hide();
}

export function CartOffcanvasBody({ cartItems, total, onRemove }) {
  const isEmpty = cartItems.length === 0;

  // Sin ítems no hay lista ni total: el panel invita a volver al catálogo.
  if (isEmpty) {
    return (
      <div id="cart-empty-message" className="cart-empty">
        <i className="bi bi-bag" aria-hidden="true"></i>
        <p>Tu carrito está vacío. Explora el catálogo y encuentra tu próximo juego.</p>
        <a
          href="#catalogo"
          className="btn btn-outline-primary btn-sm"
          onClick={closeCartAndGoToCatalog}
        >
          Ver catálogo
        </a>
      </div>
    );
  }

  return (
    <>
      <ul id="cart-items-list" className="cart-items-list list-unstyled">
        {cartItems.map(({ product, quantity }) => {
          const subtotal = product.price * quantity;
          return (
            <li
              key={product.id}
              className="cart-item d-flex justify-content-between align-items-center gap-2"
            >
              <span className="cart-item-info">
                {product.name} × {quantity} — ${formatNumberCL(subtotal)} CLP
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                aria-label={`Quitar ${product.name} del carrito`}
                onClick={() => onRemove(product.id)}
              >
                Quitar
              </button>
            </li>
          );
        })}
      </ul>
      <p id="cart-total" className="cart-total fw-bold mt-3">
        Total: ${formatNumberCL(total)} CLP
      </p>
    </>
  );
}
