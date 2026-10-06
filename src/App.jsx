import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCatalog } from "./hooks/useCatalog.js";
import { useCart } from "./hooks/useCart.js";
import { useToast } from "./hooks/useToast.js";
import { SearchForm } from "./components/SearchForm.jsx";
import { CategoryMenu } from "./components/CategoryMenu.jsx";
import { ProductList } from "./components/ProductList.jsx";
import { CartBadge } from "./components/CartBadge.jsx";
import { CartToast } from "./components/CartToast.jsx";
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
  cartToastRoot: "cart-toast-root",
};

const SEARCH_RESULTS_ID = "catalogo-resultado";
const NAVBAR_SELECTOR = ".site-header";

// Lleva los resultados a la vista solo si su inicio queda fuera del área visible bajo el navbar sticky.
function scrollToResultsIfHidden() {
  const target = document.getElementById(SEARCH_RESULTS_ID);
  if (!target) return;
  const navbarHeight = document.querySelector(NAVBAR_SELECTOR)?.getBoundingClientRect().height ?? 0;
  const top = target.getBoundingClientRect().top;
  if (top >= navbarHeight && top < window.innerHeight) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: window.scrollY + top - navbarHeight - 16,
    behavior: reduceMotion ? "instant" : "smooth",
  });
}

export function StorefrontApp() {
  const catalog = useCatalog();
  const cart = useCart();
  const toast = useToast();
  // Se incrementa en cada submit; el efecto corre después de que el catálogo ya se re-renderizó.
  const [searchSubmitCount, setSearchSubmitCount] = useState(0);

  useEffect(() => {
    if (searchSubmitCount > 0) scrollToResultsIfHidden();
  }, [searchSubmitCount]);

  const { addToCart } = cart;
  const { show: showToast } = toast;
  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product);
      showToast(`${product.name} se agregó al carrito`);
    },
    [addToCart, showToast]
  );

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
        createPortal((
          <SearchForm
            onSearch={catalog.setSearchTerm}
            onSubmitted={() => setSearchSubmitCount((count) => count + 1)}
          />
        ), mounts.searchRoot)}

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
            onAddToCart={handleAddToCart}
            isInCart={cart.isInCart}
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

      {mounts.cartToastRoot &&
        createPortal(<CartToast toast={toast.toast} onClose={toast.dismiss} />, mounts.cartToastRoot)}
    </>
  );
}
