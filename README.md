# GameVault

Tienda online de videojuegos, consolas y accesorios. Página estática construida con HTML semántico, CSS propio y **Bootstrap 5**.

## Sitio publicado

**GitHub Pages:** [https://gustavoduocuc.github.io/video-game-basic/](https://gustavoduocuc.github.io/video-game-basic/)

## Tecnologías

- HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- CSS3 con variables personalizadas (tema GameVault)
- **Bootstrap 5.3.8** vía CDN (jsDelivr)
  - Navbar responsiva con colapso (hamburguesa), buscador y dropdown de categorías
  - Carousel con autoplay, indicadores y controles
  - Sistema de grillas (`container` / `row` / `col-*`)
  - Cards para el catálogo de productos, generadas dinámicamente vía Fetch API
  - Offcanvas para el resumen del carrito de compras

## Contenido

| Archivo / carpeta | Descripción |
|-------------------|-------------|
| `index.html` | Página principal: navbar (buscador, categorías, carrito), carrusel, catálogo, categorías, ofertas y footer |
| `styles.css` | Archivo principal de estilos; importa las hojas temáticas en el orden de la cascada |
| `css/` | Estilos separados por responsabilidad: base, navbar, carrito, layout, carrusel, catálogo, categorías, ofertas, puntuaciones, footer y responsive |
| `js/main.js` | Punto de entrada que inicializa la aplicación |
| `js/modules/` | Funcionalidades de catálogo, filtros, carrito, contacto y puntuaciones |
| `js/shared/` | Utilidades compartidas para DOM, solicitudes, estados y formato |
| `js/state.js` | Estado compartido del catálogo y los filtros |
| `assets/` | Imágenes SVG del logo y portadas de productos |
| `assets/data/products.json` | Datos del catálogo de productos, cargados vía Fetch API |
| `assets/data/scores.json` | Datos de puntuaciones, cargados vía Fetch API |

## Uso local

Servir la carpeta del proyecto mediante HTTP y abrir la URL indicada por el servidor:

```bash
npx http-server .
```

Los módulos ES y la carga de archivos JSON requieren un servidor local. También se necesita conexión a internet para cargar Bootstrap desde el CDN.

## Componentes Bootstrap usados

1. **Navbar** (`navbar-expand-lg` + `navbar-toggler`): colapsa bajo 992px; incluye un formulario de búsqueda y un dropdown de categorías.
2. **Carousel** (`data-bs-ride="carousel"`, `data-bs-interval="5000"`): juegos destacados cada 5 s.
3. **Grid**: catálogo en `col-12 col-sm-6 col-lg-4`; categorías en `col-6 col-md-4 col-lg`.
4. **Cards**: productos con altura uniforme (`h-100`) y botones `btn-primary`, generadas dinámicamente desde `assets/data/products.json`.
5. **Offcanvas**: panel lateral del carrito de compras, abierto desde el navbar.
6. **Dropdown**: filtro de categorías del navbar.

## Funcionalidades JavaScript

- **Catálogo dinámico**: los módulos de `js/` cargan `assets/data/products.json` vía Fetch API (`async/await` + `try/catch`), muestran un indicador de carga y, si la solicitud falla, un mensaje de error amigable con botón de reintentar.
- **Búsqueda y categorías**: el formulario del navbar (evento `submit`) filtra el catálogo por nombre, y el dropdown de categorías (evento `click`) filtra por categoría; ambos filtros se combinan.
- **Carrito de compras**: cada card tiene un botón "Agregar al carrito" (evento `click`) que suma el producto al carrito en memoria (o incrementa su cantidad si ya estaba agregado). El resumen —cantidad, subtotal y total— se muestra dinámicamente en el panel Offcanvas del navbar, junto con la opción de quitar productos. **Limitación conocida**: el carrito no persiste entre recargas de página (no usa `localStorage`), ya que es una demostración de estado en memoria sin backend.
- **Detalle de producto y resaltado**: se mantienen igual que antes (click para expandir detalle, mouseover/mouseout para resaltar la card), ahora enganchados por delegación de eventos sobre las cards generadas dinámicamente.

## Estructura semántica

La página usa una jerarquía de encabezados `<h1>`–`<h3>`, listas para ofertas, enlaces descriptivos e imágenes con texto alternativo.

## Validación

HTML validado con https://jsonformatter.org/html-validator
