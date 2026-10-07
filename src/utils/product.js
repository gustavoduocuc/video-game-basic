import { CATEGORIES } from "../data/categories.js";
import { formatNumberCL } from "./format.js";

const PLACEHOLDER_IMAGE = "assets/placeholder-game.svg";
let createdCount = 0;

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Arma un producto con la misma forma que los de products.json a partir del formulario de alta.
export function buildProduct(values) {
  createdCount += 1;
  const name = values.name.trim();
  const price = Number(values.price);
  const image = values.image.trim();
  const category = CATEGORIES.find((item) => item.slug === values.categorySlug);

  return {
    id: `nuevo-${slugify(name)}-${Date.now().toString(36)}${createdCount}`,
    name,
    description: values.description.trim(),
    price,
    priceLabel: `Precio: $${formatNumberCL(price)} CLP`,
    category: category.label,
    categorySlug: category.slug,
    image: image || PLACEHOLDER_IMAGE,
    imageAlt: image ? `Portada de ${name}` : `Imagen genérica de GameVault para ${name}`,
    detail: "Producto agregado recientemente al catálogo de GameVault.",
    bestseller: false,
    onSale: false,
  };
}
