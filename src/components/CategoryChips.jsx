import { CATEGORIES } from "../data/categories.js";

function scrollToCatalog() {
  const catalog = document.getElementById("catalogo");
  if (!catalog) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  catalog.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "start" });
}

export function CategoryChips({ category, onSelectCategory }) {
  return (
    <div className="row g-3 mt-1">
      {CATEGORIES.map((item) => {
        const isActive = category === item.slug;
        return (
          <div key={item.slug} className="col-6 col-md-4 col-lg">
            <button
              type="button"
              className={`category-chip w-100 text-center${isActive ? " is-active" : ""}`}
              aria-pressed={isActive}
              onClick={() => {
                onSelectCategory(item.slug);
                scrollToCatalog();
              }}
            >
              {item.label}
            </button>
          </div>
        );
      })}
    </div>
  );
}
