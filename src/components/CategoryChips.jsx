import { CATEGORIES } from "../data/categories.js";
import { scrollToSection } from "../utils/scroll.js";

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
                scrollToSection("catalogo");
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
