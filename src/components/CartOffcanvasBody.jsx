import { formatNumberCL } from "../utils/format.js";

export function CartOffcanvasBody({ cartItems, total, onRemove }) {
  const isEmpty = cartItems.length === 0;

  // Sin ítems no hay lista ni total: el panel invita a volver al catálogo.
  if (isEmpty) {
    return (
      <div id="cart-empty-message" className="cart-empty">
        <i className="bi bi-bag" aria-hidden="true"></i>
        <p>Tu carrito está vacío. Explora el catálogo y encuentra tu próximo juego.</p>
        <a href="#catalogo" className="btn btn-outline-primary btn-sm" data-bs-dismiss="offcanvas">
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
