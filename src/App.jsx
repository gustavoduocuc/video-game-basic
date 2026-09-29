import { createPortal } from "react-dom";
import { useCatalog } from "./hooks/useCatalog.js";
import { useCart } from "./hooks/useCart.js";
import { SearchForm } from "./components/SearchForm.jsx";
import { CategoryMenu } from "./components/CategoryMenu.jsx";
import { ProductList } from "./components/ProductList.jsx";
import { CartBadge } from "./components/CartBadge.jsx";
import { CartOffcanvasBody } from "./components/CartOffcanvasBody.jsx";

// Nodos ya presentes en index.html: React los llena vía portales, sin desmontar
// el resto de la página estática (navbar, carrusel, categorías, puntuaciones, contacto).
const MOUNT_IDS = {
  searchRoot: "navbar-search-root",
  categoryMenu: "navbar-category-menu",
  categoryIcon: "category-filter-icon-root",
  cartCount: "cart-count",
  catalogRoot: "catalogo-root",
  cartOffcanvasRoot: "cart-offcanvas-root",
};

export function StorefrontApp() {
  const catalog = useCatalog();
  const cart = useCart();

  const portals = Object.entries(MOUNT_IDS)
    .map(([key, id]) => [key, document.getElementById(id)])
    .filter(([, el]) => el !== null);

  const mounts = Object.fromEntries(portals);
  if (Object.keys(mounts).length !== Object.keys(MOUNT_IDS).length) {
    console.error("[GameVault] Faltan contenedores de montaje para la app de React.");
  }

  return (
    <>
      {mounts.searchRoot &&
        createPortal(<SearchForm onSearch={catalog.setSearchTerm} />, mounts.searchRoot)}

      {mounts.categoryMenu &&
        createPortal(
          <CategoryMenu category={catalog.category} onSelectCategory={catalog.setCategory} />,
          mounts.categoryMenu
        )}

      {mounts.categoryIcon &&
        createPortal(
          catalog.category ? (
            <i id="category-filter-icon" className="bi bi-funnel-fill ms-1" aria-hidden="true"></i>
          ) : null,
          mounts.categoryIcon
        )}

      {mounts.cartCount && createPortal(<CartBadge totalItems={cart.totalItems} />, mounts.cartCount)}

      {mounts.catalogRoot &&
        createPortal(
          <ProductList
            status={catalog.status}
            filteredProducts={catalog.filteredProducts}
            category={catalog.category}
            searchTerm={catalog.searchTerm}
            onClearCategory={() => catalog.setCategory("")}
            onAddToCart={cart.addToCart}
            onRetry={catalog.retry}
          />,
          mounts.catalogRoot
        )}

      {mounts.cartOffcanvasRoot &&
        createPortal(
          <CartOffcanvasBody
            cartItems={cart.cartItems}
            total={cart.total}
            onRemove={cart.removeFromCart}
          />,
          mounts.cartOffcanvasRoot
        )}
    </>
  );
}
