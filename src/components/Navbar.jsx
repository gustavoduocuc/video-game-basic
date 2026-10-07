import { SearchForm } from "./SearchForm.jsx";
import { CategoryMenu } from "./CategoryMenu.jsx";
import { CartBadge } from "./CartBadge.jsx";

// El dropdown de categorías se inserta después de "Ofertas" (CATEGORY_MENU_AFTER).
const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#destacados", label: "Destacados" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#ofertas", label: "Ofertas" },
  { href: "#puntuaciones", label: "Puntuaciones" },
  { href: "#contacto", label: "Contacto" },
];
const CATEGORY_MENU_AFTER = "#ofertas";

// Bootstrap muta las clases de #mainNav y .dropdown-menu (collapse/dropdown): sus className
// deben ser constantes para que React no pise el estado abierto al re-renderizar.
export function Navbar({ category, onSelectCategory, totalItems, onSearch, onSearchSubmitted }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg" aria-label="Navegación principal">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
            <img
              className="logo"
              src="assets/logo.svg"
              alt="Logotipo de GameVault: un joystick estilizado dentro de un escudo"
              width={120}
              height={60}
            />
            <span className="fw-bold">GameVault</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Abrir o cerrar menú de navegación"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {NAV_LINKS.map((link) => (
                <NavItem
                  key={link.href}
                  link={link}
                  category={category}
                  onSelectCategory={onSelectCategory}
                />
              ))}
            </ul>

            <button
              type="button"
              className="btn btn-primary position-relative d-block ms-auto"
              id="cart-toggle-button"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartOffcanvas"
              aria-controls="cartOffcanvas"
              aria-label="Abrir carrito de compras"
            >
              <span id="cart-count" aria-live="polite">
                <CartBadge totalItems={totalItems} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Fila propia para el buscador: no compite por espacio con los enlaces en tablet/laptop. */}
      <div className="site-search-bar">
        <div className="container">
          <SearchForm onSearch={onSearch} onSubmitted={onSearchSubmitted} />
        </div>
      </div>
    </>
  );
}

function NavItem({ link, category, onSelectCategory }) {
  const item = (
    <li className="nav-item">
      <a className="nav-link" href={link.href}>
        {link.label}
      </a>
    </li>
  );
  if (link.href !== CATEGORY_MENU_AFTER) return item;

  return (
    <>
      {item}
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#categorias"
          id="navbarCategoriesDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Categorías
          {category && (
            <i id="category-filter-icon" className="bi bi-funnel-fill ms-1" aria-hidden="true"></i>
          )}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarCategoriesDropdown" id="navbar-category-menu">
          <CategoryMenu category={category} onSelectCategory={onSelectCategory} />
        </ul>
      </li>
    </>
  );
}
