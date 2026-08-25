# GameVault

Estructura de página principal para una tienda de videojuegos, construida con HTML semántico y estilada con CSS externo.

## Contenido

- `index.html` — página principal: header con logo y navegación, catálogo de productos, categorías, ofertas y footer de contacto.
- `styles.css` — hoja de estilos externa enlazada desde el `<head>`: modelo de cajas, colores, tipografía y selectores avanzados.
- `assets/` — imágenes SVG del logo y de las portadas de los productos.

## Uso

Abrir `index.html` directamente en el navegador, sin necesidad de servidor ni instalación:

```bash
open index.html
```

## Estructura semántica

La página usa `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` y `<footer>` para organizar el contenido, con una jerarquía de encabezados `<h1>`–`<h3>`, listas para categorías y ofertas, enlaces descriptivos e imágenes con texto alternativo.

## Estilos (`styles.css`)

- **Modelo de cajas**: `box-sizing: border-box` global; cada tarjeta de producto, chip de categoría e ítem de oferta usa `padding`, `border` y `margin` consistentes para evitar que el contenido se vea amontonado o desbordado.
- **Colores y tipografía**: paleta definida con variables CSS (`:root`), fondo oscuro con acentos morado y verde; jerarquía tipográfica clara entre `h1`, `h2`, `h3` y texto de párrafo.
- **Selectores avanzados**: clases reutilizables (`.product-card`, `.category-list`, `.offers-list`, etc.), IDs únicos por sección, y selectores `:nth-child()`, `:first-child`, `:hover`/`:focus-visible` y `::before`/`::after` para personalizar tarjetas de producto, categorías y ofertas sin depender de estilos en línea.
- Estados destacados (producto más vendido, mejor oferta) se comunican con etiquetas de texto (`::after` con contenido), no con bordes de color que pudieran confundirse con un estado de selección/foco.

## Validación estructura HTML
HTML Validado con https://jsonformatter.org/html-validator 

## Cómo se ve
### Desktop
<img width="1322" height="1233" alt="Screenshot 2026-08-24 at 9 21 07 PM" src="https://github.com/user-attachments/assets/cba52bee-33c7-4bf9-ad8d-4f7360af75f9" />
<img width="1324" height="1074" alt="Screenshot 2026-08-24 at 9 21 21 PM" src="https://github.com/user-attachments/assets/18b76123-ab1f-4ac2-8f55-70b5072cd480" />

### Tablet
<img width="876" height="1136" alt="Screenshot 2026-08-24 at 9 22 23 PM" src="https://github.com/user-attachments/assets/98aaf76e-29eb-48d0-848d-ba42bcb7e1a2" />
<img width="866" height="998" alt="Screenshot 2026-08-24 at 9 22 32 PM" src="https://github.com/user-attachments/assets/94301e28-b89c-446b-89d9-7cbb55671c37" />

### Mobile
<img width="512" height="1137" alt="Screenshot 2026-08-24 at 9 22 58 PM" src="https://github.com/user-attachments/assets/163cd8c8-9f89-4c05-a9e5-1c2c29530c94" />
<img width="511" height="1143" alt="Screenshot 2026-08-24 at 9 23 15 PM" src="https://github.com/user-attachments/assets/075119c3-a412-4d62-8023-f661cbad563b" />
<img width="507" height="1111" alt="Screenshot 2026-08-24 at 9 23 25 PM" src="https://github.com/user-attachments/assets/4884a975-ab34-4bbd-86a7-a61d0f2e84fb" />
