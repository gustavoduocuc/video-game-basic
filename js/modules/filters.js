// Gestiona búsqueda, categorías e indicador del filtro activo.
import { state } from "../state.js";
import { renderProductGrid } from "./catalog.js";

export function initStorefrontFilters() {
  const searchForm = document.getElementById("navbar-search-form");
  if (searchForm) searchForm.addEventListener("submit", handleSearchSubmit);

  const searchInput = document.getElementById("navbar-search-input");
  if (searchInput) searchInput.addEventListener("input", handleSearchInput);

  const categoryMenu = document.getElementById("navbar-category-menu");
  if (categoryMenu) categoryMenu.addEventListener("click", handleCategoryMenuClick);

  const filterChip = document.getElementById("catalogo-filtro");
  if (filterChip) {
    filterChip.addEventListener("click", (event) => {
      if (event.target.closest("[data-clear-category]")) setCategoryFilter("");
    });
  }

  updateCategoryIndicator();
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("navbar-search-input");
  state.searchTerm = input.value.trim().toLowerCase();
  applyFilters();
}

function handleSearchInput(event) {
  if (event.target.value.trim() === "" && state.searchTerm !== "") {
    state.searchTerm = "";
    applyFilters();
  }
}

function handleCategoryMenuClick(event) {
  const link = event.target.closest("[data-category-filter]");
  if (!link) return;

  event.preventDefault();
  setCategoryFilter(link.dataset.categoryFilter);
}

function setCategoryFilter(slug) {
  state.category = slug;
  updateCategoryIndicator();
  applyFilters();
}

function updateCategoryIndicator() {
  const menuLinks = document.querySelectorAll("#navbar-category-menu [data-category-filter]");
  let activeLabel = "";

  menuLinks.forEach((link) => {
    const isActive = link.dataset.categoryFilter === state.category;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
      activeLabel = link.textContent.trim();
    } else {
      link.removeAttribute("aria-current");
    }
  });

  document.getElementById("category-filter-icon").hidden = !state.category;

  const chipEl = document.getElementById("catalogo-filtro");
  chipEl.innerHTML = "";
  chipEl.hidden = !state.category;
  if (!state.category) return;

  const chip = document.createElement("span");
  chip.className = "badge text-bg-primary category-filter-chip";
  chip.textContent = `Categoría: ${activeLabel}`;

  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.className = "btn btn-sm btn-link";
  clearButton.setAttribute("data-clear-category", "");
  clearButton.textContent = "Quitar filtro";

  chipEl.appendChild(chip);
  chipEl.appendChild(clearButton);
}

export function applyFilters() {
  const filtered = state.products.filter((product) => {
    const matchesCategory = !state.category || product.categorySlug === state.category;
    const matchesSearch = !state.searchTerm || product.name.toLowerCase().includes(state.searchTerm);
    return matchesCategory && matchesSearch;
  });

  renderProductGrid(filtered, "No se encontraron productos que coincidan con tu búsqueda.");
}
