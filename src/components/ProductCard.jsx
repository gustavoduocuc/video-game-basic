import { useLayoutEffect, useRef, useState } from "react";

export function ProductCard({ product, onAddToCart, onRemove, isInCart }) {
  // null = detalle nunca solicitado (no existe aún en el DOM); true/false = visible/oculto.
  const [detailOpen, setDetailOpen] = useState(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
  // Local a la card: expandir la descripción no toca el carrito ni el detalle.
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  // "Ver más" solo tiene sentido si el clamp de 2 líneas llega a recortar el texto; depende del ancho de la card.
  const descriptionRef = useRef(null);
  const [descriptionTruncated, setDescriptionTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = descriptionRef.current;
    if (!el || descriptionExpanded) return undefined;
    const measure = () => setDescriptionTruncated(el.scrollHeight > el.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [descriptionExpanded, product.description]);

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <article
        id={product.id}
        className={`card h-100 product-card${isHighlighted ? " is-highlighted" : ""}${
          product.onSale ? " is-offer" : ""
        }`}
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
          <p
            ref={descriptionRef}
            className={`card-text product-description${descriptionExpanded ? " is-expanded" : ""}`}
          >
            {product.description}
          </p>
          {(descriptionTruncated || descriptionExpanded) && (
            <button
              type="button"
              className="btn btn-link btn-sm product-description-toggle"
              aria-expanded={descriptionExpanded}
              onClick={() => setDescriptionExpanded((expanded) => !expanded)}
            >
              {descriptionExpanded ? "Ver menos" : "Ver más"}
            </button>
          )}
          <p className="card-text price mt-auto fw-bold">
            {product.onSale && <span className="badge text-bg-warning offer-badge">Oferta</span>}
            {product.priceLabel}
          </p>
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
          {/* isInCart viene del mismo useCart: el clic sigue sumando cantidad. */}
          <button
            type="button"
            className={isInCart ? "btn btn-success mt-2" : "btn btn-outline-primary mt-2"}
            aria-label={
              isInCart ? `${product.name} ya está en el carrito` : `Agregar ${product.name} al carrito`
            }
            onClick={() => onAddToCart(product)}
          >
            {isInCart ? "En el carrito ✓" : "Agregar al carrito"}
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm mt-2"
            aria-label={`Eliminar ${product.name} del catálogo`}
            onClick={() => onRemove(product)}
          >
            <i className="bi bi-trash me-1" aria-hidden="true"></i>
            Eliminar
          </button>
        </div>
      </article>
    </div>
  );
}
