import { useState } from "react";

export function ProductCard({ product, onAddToCart }) {
  // null = detalle nunca solicitado (no existe aún en el DOM); true/false = visible/oculto.
  const [detailOpen, setDetailOpen] = useState(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <article
        id={product.id}
        className={`card h-100 product-card${isHighlighted ? " is-highlighted" : ""}`}
        onMouseOver={() => setIsHighlighted(true)}
        onMouseOut={() => setIsHighlighted(false)}
      >
        <span className="badge text-bg-primary category-badge">{product.category}</span>
        {product.bestseller && (
          <span className="badge text-bg-danger bestseller-badge">Más vendido</span>
        )}
        <img
          src={product.image}
          className="card-img-top"
          alt={product.imageAlt}
          width={300}
          height={400}
        />
        <div className="card-body d-flex flex-column">
          <h3 className="card-title h5">{product.name}</h3>
          <p className="card-text">{product.description}</p>
          <p className="card-text price mt-auto fw-bold">{product.priceLabel}</p>
          <button
            type="button"
            className="btn btn-primary"
            aria-expanded={detailOpen === true}
            aria-label={`Mostrar u ocultar detalles de ${product.name}`}
            onClick={() => setDetailOpen((prev) => !prev)}
          >
            Ver detalles de {product.name}
          </button>
          {detailOpen !== null && (
            <div className="product-detail" hidden={!detailOpen}>
              <p className="product-detail-text">{product.detail}</p>
            </div>
          )}
          <button
            type="button"
            className="btn btn-outline-primary mt-2"
            aria-label={`Agregar ${product.name} al carrito`}
            onClick={() => onAddToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      </article>
    </div>
  );
}
