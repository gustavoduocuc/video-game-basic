# Historial de cambios

Etapas del desarrollo de GameVault, de la más reciente a la más antigua. Las fechas corresponden a los commits del repositorio.

## 2026-10-07 — Cumplimiento de criterios de aceptación

- HTML sin errores en el validador del W3C: el offcanvas del carrito declara `role="dialog"` y la presentación del sitio (con el `<h1>`) quedó dentro de `<main>`.
- Todos los botones primarios de Bootstrap usan el color del tema GameVault, también en hover y foco.
- Refactor de componentes: helper compartido de desplazamiento (respeta "reducir movimiento") y hook `useForm` reutilizado por los formularios de contacto y de alta de videojuegos.
- Corrección en Safari: al elegir un chip de categoría, el catálogo filtrado vuelve a quedar a la vista.
- Pruebas en Chrome, Firefox y Safari (escritorio e iPhone), con la tabla de navegadores en la evidencia.
- README con requisitos, instalación paso a paso y guía de uso; versiones de Node declaradas en `package.json`; este CHANGELOG.

## 2026-10-07 — Permiso de administración del catálogo

- "Agregar videojuego" y "Eliminar" solo se muestran con el permiso `gamevault:admin` en `sessionStorage` (control académico, documentado en el README).

## 2026-10-07 — Navbar, contacto y gestión del catálogo en React

- El navbar pasa a ser un componente de React que compone el buscador, el menú de categorías y el contador del carrito.
- El formulario de contacto se mueve a su propia sección y se reescribe en React con validación por campo.
- Alta y baja de videojuegos desde la interfaz, con imagen genérica cuando no se indica una.
- Los chips de "Categorías de productos" filtran el catálogo y se sincronizan con el navbar.
- Evidencia de pruebas y README actualizados.

## 2026-09-28 al 2026-10-05 — Migración a React (Vite)

- Catálogo, filtros y carrito migrados a React 19 con Vite, con estado en hooks (`useCatalog`, `useCart`, `useToast`) repartido por props.
- Estados de oferta y del carrito en la interfaz, notificación al agregar productos y desplazamiento a los resultados de búsqueda.
- Correcciones: "Ver catálogo" desde el carrito vacío cierra el panel; "Ver más" solo aparece si la descripción está truncada.
- Publicación en GitHub Pages con `npm run deploy` documentada en el README.

## 2026-09-21 — Mejoras de experiencia y evidencia de pruebas

- Header fijo con barra de búsqueda y mejoras de usabilidad.
- JavaScript y CSS separados por responsabilidad en módulos y hojas temáticas.
- Evidencia de pruebas del sitio y de los formularios en tres resoluciones.

## 2026-09-14 — Interactividad con JavaScript

- Manipulación del DOM, eventos y carga de datos con Fetch API (catálogo, carrito y puntuaciones).

## 2026-09-07 — Integración de Bootstrap 5

- Navbar responsiva, carrusel de destacados, sistema de grillas y cards de productos.

## 2026-08-24 al 2026-08-30 — Estilos y rediseño

- Hoja de estilos propia, rediseño de la página y ejemplos de categorías.
- README con capturas en distintos dispositivos.

## 2026-08-17 — Primera versión

- Página HTML semántica de la tienda de videojuegos, README inicial y referencia al validador de HTML.
