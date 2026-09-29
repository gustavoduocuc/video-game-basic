import { formatNumberCL } from "../utils/format.js";

export function CartOffcanvasBody({ cartItems, total, onRemove }) {
  const isEmpty = cartItems.length === 0;

  return (
    <>
      <p id="cart-empty-message" className="text-muted" hidden={!isEmpty}>
        Tu carrito está vacío.
      </p>
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
      <p id="cart-total" className="cart-total fw-bold mt-3" hidden={isEmpty}>
        {!isEmpty && `Total: $${formatNumberCL(total)} CLP`}
      </p>
    </>
  );
}
