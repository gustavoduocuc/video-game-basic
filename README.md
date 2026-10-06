# GameVault

Tienda online de videojuegos, consolas y accesorios. Construida con HTML semántico, CSS propio, **Bootstrap 5** y **React** (Vite) para el catálogo, los filtros y el carrito.

## Sitio publicado

**GitHub Pages:** [https://gustavoduocuc.github.io/video-game-basic/](https://gustavoduocuc.github.io/video-game-basic/)

## Tecnologías

- HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- CSS3 con variables personalizadas (tema GameVault)
- **Bootstrap 5.3.8** vía CDN (jsDelivr)
  - Navbar responsiva con colapso (hamburguesa), buscador y dropdown de categorías
  - Carousel con autoplay, indicadores y controles
  - Sistema de grillas (`container` / `row` / `col-*`)
  - Cards para el catálogo de productos
  - Offcanvas para el resumen del carrito de compras
- **React 19 + Vite**: componentes funcionales para el catálogo, el buscador, el filtro de categorías y el carrito, montados sobre el mismo HTML/CSS de Bootstrap (ver "Arquitectura de la app de React" más abajo)
- El resto de la página (carrusel, categorías, ofertas, puntuaciones y formulario de contacto) sigue siendo HTML + JavaScript vainilla con módulos ES

## Contenido

| Archivo / carpeta | Descripción |
|-------------------|-------------|
| `index.html` | Punto de entrada de Vite: navbar, carrusel, catálogo, categorías, ofertas, puntuaciones y footer; incluye los contenedores donde React monta el catálogo, los filtros y el carrito |
| `src/` | App de React: `App.jsx` (ensambla todo), `components/`, `hooks/` (`useCatalog`, `useCart`), `data/` y `utils/` |
| `vite.config.js` | Configuración de Vite (plugin de React, `base: './'`) |
| `public/styles.css` | Archivo principal de estilos; importa las hojas temáticas en el orden de la cascada |
| `public/css/` | Estilos separados por responsabilidad: base, navbar, carrito, layout, carrusel, catálogo, categorías, ofertas, puntuaciones, footer y responsive |
| `js/main.js` | Punto de entrada del JavaScript vainilla restante: puntuaciones y formulario de contacto |
| `js/modules/` | `contact-form.js` y `scores.js` |
| `js/shared/` | Utilidades compartidas para DOM, solicitudes, estados y formato (usadas por `scores.js`) |
| `public/assets/` | Imágenes SVG del logo y portadas de productos |
| `public/assets/data/products.json` | Datos del catálogo de productos, cargados vía Fetch API desde React |
| `public/assets/data/scores.json` | Datos de puntuaciones, cargados vía Fetch API |

## Uso local

```bash
npm install
npm run dev       # servidor de desarrollo con recarga en caliente
npm run build     # build de producción en dist/
npm run preview   # sirve el build de producción localmente
npm run deploy    # build + publicación en GitHub Pages
```

## Despliegue

El código fuente vive en la rama `main`. La rama `gh-pages` contiene solo el sitio compilado y es la que sirve GitHub Pages; no se edita a mano.

`npm run deploy` ejecuta `npm run build` y luego usa el paquete [`gh-pages`](https://www.npmjs.com/package/gh-pages) para publicar el contenido de `dist/` en la raíz de la rama `gh-pages`, reemplazando la versión anterior. Como `vite.config.js` usa `base: './'` (rutas relativas), el build funciona bajo el sub-path `/video-game-basic/` sin configuración adicional.

Antes de desplegar, conviene revisar el build localmente con `npm run build && npm run preview`.

## Arquitectura de la app de React

El catálogo, el buscador, el filtro de categorías y el carrito son componentes funcionales de React (`src/`) que se proyectan, mediante `ReactDOM.createPortal`, dentro del mismo HTML de Bootstrap que ya existía (navbar, offcanvas, sección de catálogo), sin introducir un router ni reescribir el resto de la página:

- `useCatalog` — carga `assets/data/products.json` con `fetch` dentro de un `useEffect`, y expone estado de carga/error/listo, categoría y término de búsqueda activos, y la lista filtrada.
- `useCart` — estado del carrito con `useState` (agregar, quitar, contador, total). No persiste entre recargas (demostración en memoria, sin backend).
- `ProductList` / `ProductCard` — catálogo con renderizado condicional (carga, error con botón "Reintentar", sin resultados, o grilla de productos) y detalle expandible por producto.
- `SearchForm` / `CategoryMenu` — buscador (`onSubmit`/`onChange`) y dropdown de categorías (`onClick`), conectados al mismo estado que filtra el catálogo.

## Componentes Bootstrap usados

1. **Navbar** (`navbar-expand-lg` + `navbar-toggler`): colapsa bajo 992px; incluye un formulario de búsqueda y un dropdown de categorías.
2. **Carousel** (`data-bs-ride="carousel"`, `data-bs-interval="5000"`): juegos destacados cada 5 s.
3. **Grid**: catálogo en `col-12 col-sm-6 col-lg-4`; categorías en `col-6 col-md-4 col-lg`.
4. **Cards**: productos con altura uniforme (`h-100`) y botones `btn-primary`, generadas dinámicamente desde `assets/data/products.json`.
5. **Offcanvas**: panel lateral del carrito de compras, abierto desde el navbar.
6. **Dropdown**: filtro de categorías del navbar.

## Funcionalidades

- **Catálogo dinámico** (React): `useCatalog` carga `assets/data/products.json` vía Fetch API dentro de un `useEffect`, muestra un indicador de carga y, si la solicitud falla, un mensaje de error amigable con botón de reintentar.
- **Búsqueda y categorías** (React): el formulario del navbar (`onSubmit`/`onChange`) filtra el catálogo por nombre, y el dropdown de categorías (`onClick`) filtra por categoría; ambos filtros se combinan.
- **Carrito de compras** (React): cada card tiene un botón "Agregar al carrito" que suma el producto al carrito (`useState`) o incrementa su cantidad si ya estaba agregado. El resumen —cantidad, subtotal y total— se muestra dinámicamente en el panel Offcanvas del navbar, junto con la opción de quitar productos. **Limitación conocida**: el carrito no persiste entre recargas de página (no usa `localStorage`), ya que es una demostración de estado en memoria sin backend.
- **Detalle de producto y resaltado** (React): estado local del componente `ProductCard` (click para expandir detalle, mouseover/mouseout para resaltar la card).
- **Puntuaciones y contacto** (JavaScript vainilla, sin cambios): `js/modules/scores.js` carga `assets/data/scores.json` vía Fetch API con los mismos estados de carga/error; `js/modules/contact-form.js` valida el formulario de contacto en el evento `submit`.

## Capturas

<p>
  <img src="public/assets/screenshots/e2e-carga-inicial-desktop.jpg" width="280" alt="Catálogo cargado" />
  <img src="public/assets/screenshots/e2e-categorias-desktop.jpg" width="280" alt="Filtro por categoría aplicado" />
  <img src="public/assets/screenshots/e2e-carrito-desktop.jpg" width="280" alt="Carrito con productos" />
</p>
<p>
  <img src="public/assets/screenshots/react-carrito-vacio.jpg" width="280" alt="Carrito vacío" />
  <img src="public/assets/screenshots/e2e-error-carga-desktop.jpg" width="280" alt="Estado de error del catálogo" />
</p>

Más capturas (búsqueda, contacto, responsividad) en [docs/testing-evidence.md](docs/testing-evidence.md).

## Estructura semántica

La página usa una jerarquía de encabezados `<h1>`–`<h3>`, listas para ofertas, enlaces descriptivos e imágenes con texto alternativo.

## Validación

HTML validado con https://jsonformatter.org/html-validator

La evidencia de las verificaciones realizadas está disponible en [docs/testing-evidence.md](docs/testing-evidence.md).
