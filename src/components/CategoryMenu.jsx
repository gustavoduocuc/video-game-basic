import { CATEGORIES } from "../data/categories.js";

const ALL_CATEGORIES_LABEL = "Todas las categorías";

export function CategoryMenu({ category, onSelectCategory }) {
  return (
    <>
      <li>
        <a
          className={`dropdown-item${category === "" ? " active" : ""}`}
          href="#catalogo"
          aria-current={category === "" ? "true" : undefined}
          onClick={(event) => {
            event.preventDefault();
            onSelectCategory("");
          }}
        >
          {ALL_CATEGORIES_LABEL}
        </a>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      {CATEGORIES.map((item) => (
        <li key={item.slug}>
          <a
            className={`dropdown-item${category === item.slug ? " active" : ""}`}
            href="#catalogo"
            aria-current={category === item.slug ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              onSelectCategory(item.slug);
            }}
          >
            {item.label}
          </a>
        </li>
      ))}
    </>
  );
}
