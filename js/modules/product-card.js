// Construye la card de producto manteniendo el DOM público de GameVault.
export function createProductCardElement(product) {
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-lg-4";

  const article = document.createElement("article");
  article.className = "card h-100 product-card";
  article.id = product.id;

  const categoryBadge = document.createElement("span");
  categoryBadge.className = "badge text-bg-primary category-badge";
  categoryBadge.textContent = product.category;
  article.appendChild(categoryBadge);

  if (product.bestseller) {
    const bestsellerBadge = document.createElement("span");
    bestsellerBadge.className = "badge text-bg-danger bestseller-badge";
    bestsellerBadge.textContent = "Más vendido";
    article.appendChild(bestsellerBadge);
  }

  const img = document.createElement("img");
  img.src = product.image;
  img.className = "card-img-top";
  img.alt = product.imageAlt;
  img.width = 300;
  img.height = 400;
  article.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column";

  const title = document.createElement("h3");
  title.className = "card-title h5";
  title.textContent = product.name;
  cardBody.appendChild(title);

  const description = document.createElement("p");
  description.className = "card-text";
  description.textContent = product.description;
  cardBody.appendChild(description);

  const price = document.createElement("p");
  price.className = "card-text price mt-auto fw-bold";
  price.textContent = product.priceLabel;
  cardBody.appendChild(price);

  const detailButton = document.createElement("button");
  detailButton.type = "button";
  detailButton.className = "btn btn-primary";
  detailButton.setAttribute("data-toggle-detail", "");
  detailButton.dataset.detail = product.detail;
  detailButton.setAttribute("aria-expanded", "false");
  detailButton.setAttribute("aria-label", `Mostrar u ocultar detalles de ${product.name}`);
  detailButton.textContent = `Ver detalles de ${product.name}`;
  cardBody.appendChild(detailButton);

  const addToCartButton = document.createElement("button");
  addToCartButton.type = "button";
  addToCartButton.className = "btn btn-outline-primary mt-2";
  addToCartButton.setAttribute("data-add-to-cart", "");
  addToCartButton.dataset.productId = product.id;
  addToCartButton.setAttribute("aria-label", `Agregar ${product.name} al carrito`);
  addToCartButton.textContent = "Agregar al carrito";
  cardBody.appendChild(addToCartButton);

  article.appendChild(cardBody);
  col.appendChild(article);
  return col;
}
