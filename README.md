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
<img width="1293" height="1298" alt="desktop-1" src="https://github.com/user-attachments/assets/5dff6505-0fea-45d7-84ab-5802bc3e80db" />
<img width="1292" height="1300" alt="desktop-2" src="https://github.com/user-attachments/assets/d6e38d4b-a648-4f1f-a2ae-55a3c0edb60a" />

### Tablet
<img width="910" height="1272" alt="tablet-1" src="https://github.com/user-attachments/assets/77de7eae-ded9-4aa5-a0ff-1ae5f8aea957" />
<img width="908" height="1273" alt="tablet-2" src="https://github.com/user-attachments/assets/9ed696a3-935f-446b-904a-04d22da2c045" />

### Mobile
<img width="664" height="1002" alt="phone-1" src="https://github.com/user-attachments/assets/a0120a05-f400-4404-be1d-80d5667cf70c" />
<img width="635" height="1002" alt="phone-2" src="https://github.com/user-attachments/assets/13dd8d26-3877-4f3e-9f98-2c31bb7bed10" />
<img width="622" height="999" alt="phone-3" src="https://github.com/user-attachments/assets/dfb24fbd-a8de-4c1b-8df8-5de2fd534045" />
<img width="625" height="1017" alt="phone-4" src="https://github.com/user-attachments/assets/0b3b82f4-d831-4053-b1cd-24cc769092d9" />
