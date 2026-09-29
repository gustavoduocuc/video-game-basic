export function CartBadge({ totalItems }) {
  // Estilo e ícono distintos en cuanto hay al menos una unidad.
  const hasItems = totalItems > 0;

  return (
    <span className={`badge rounded-pill cart-count${hasItems ? " cart-count--active" : ""}`}>
      <i className={`bi ${hasItems ? "bi-cart-check" : "bi-cart3"}`} aria-hidden="true"></i>
      {totalItems}
    </span>
  );
}
