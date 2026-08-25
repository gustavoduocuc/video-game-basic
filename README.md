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
<img width="1086" height="1232" alt="Screenshot 2026-08-17 at 3 40 04 PM" src="https://github.com/user-attachments/assets/633a43c8-13e3-48df-91da-6136937173e1" />
<img width="1082" height="1232" alt="Screenshot 2026-08-17 at 3 40 28 PM" src="https://github.com/user-attachments/assets/1cbe7bab-422c-43d0-88f8-94dfcda1f35d" />
