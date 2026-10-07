import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCatalog } from "./hooks/useCatalog.js";
import { useCart } from "./hooks/useCart.js";
import { useToast } from "./hooks/useToast.js";
import { Navbar } from "./components/Navbar.jsx";
import { ProductForm } from "./components/ProductForm.jsx";
import { ProductList } from "./components/ProductList.jsx";
import { CartToast } from "./components/CartToast.jsx";
import { CartOffcanvasBody } from "./components/CartOffcanvasBody.jsx";
import { ContactForm } from "./components/ContactForm.jsx";

// Nodos ya presentes en index.html: React los llena vía portales, sin desmontar
// el resto de la página estática (carrusel, ofertas, puntuaciones).
const MOUNT_IDS = {
  headerRoot: "site-header-root",
  catalogRoot: "catalogo-root",
  cartOffcanvasRoot: "cart-offcanvas-root",
  cartToastRoot: "cart-toast-root",
  contactRoot: "contact-form-root",
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

  const { addProduct, removeProduct } = catalog;
  const { removeFromCart } = cart;
  const handleRemoveProduct = useCallback(
    (product) => {
      removeProduct(product.id);
      removeFromCart(product.id);
      showToast(`${product.name} se eliminó del catálogo`);
    },
    [removeProduct, removeFromCart, showToast]
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
      {mounts.headerRoot &&
        createPortal(
          <Navbar
            category={catalog.category}
            onSelectCategory={catalog.setCategory}
            totalItems={cart.totalItems}
            onSearch={catalog.setSearchTerm}
            onSearchSubmitted={() => setSearchSubmitCount((count) => count + 1)}
          />,
          mounts.headerRoot
        )}

      {mounts.catalogRoot &&
        createPortal(
          <>
            {catalog.status === "ready" && <ProductForm onAddProduct={addProduct} />}
            <ProductList
              status={catalog.status}
              filteredProducts={catalog.filteredProducts}
              category={catalog.category}
              searchTerm={catalog.searchTerm}
              onClearCategory={() => catalog.setCategory("")}
              onAddToCart={handleAddToCart}
              onRemoveProduct={handleRemoveProduct}
              isInCart={cart.isInCart}
              onRetry={catalog.retry}
            />
          </>,
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

      {mounts.contactRoot && createPortal(<ContactForm />, mounts.contactRoot)}
    </>
  );
}
