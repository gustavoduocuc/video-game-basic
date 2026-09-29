import { ProductCard } from "./ProductCard.jsx";
import { CATEGORIES } from "../data/categories.js";

export function ProductList({
  status,
  filteredProducts,
  category,
  searchTerm,
  onClearCategory,
  onAddToCart,
  onRetry,
}) {
  const activeLabel = CATEGORIES.find((item) => item.slug === category)?.label ?? "";

  return (
    <>
      <div id="catalogo-filtro" className="catalogo-filtro" aria-live="polite" hidden={!category}>
        {category && (
          <>
            <span className="badge text-bg-primary category-filter-chip">Categoría: {activeLabel}</span>
            <button type="button" className="btn btn-sm btn-link" onClick={onClearCategory}>
              Quitar filtro
            </button>
          </>
        )}
      </div>

      <div id="catalogo-resultado" aria-live="polite">
        {status === "loading" && <p className="catalogo-loading">Cargando catálogo…</p>}
        {status === "error" && (
          <>
            <p className="catalogo-error">
              No pudimos cargar el catálogo en este momento. Por favor, inténtalo nuevamente en unos segundos.
            </p>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={onRetry}>
              Reintentar
            </button>
          </>
        )}
        {status === "ready" && filteredProducts.length === 0 && (
          <p className="catalogo-empty">
            {category || searchTerm
              ? "No se encontraron productos que coincidan con tu búsqueda."
              : "No hay productos disponibles en este momento."}
          </p>
        )}
      </div>

      <div className="row g-4 mt-1" id="catalogo-lista">
        {status === "ready" &&
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
      </div>
    </>
  );
}
