# Evidencia de pruebas realizadas

Este documento reúne la evidencia de las pruebas realizadas sobre el sitio GameVault. Cada caso se verificó en las tres resoluciones indicadas y se adjunta su captura de pantalla.

## Resoluciones evaluadas

| Resolución | Tamaño de pantalla |
|------------|--------------------|
| Web (Desktop) | 1440 × 900 |
| Tablet | 768 × 1024 |
| Mobile | 412 × 839 |

## Casos evaluados

1. [Carga inicial de productos](#1-carga-inicial-de-productos)
2. [Búsqueda de productos mediante el formulario](#2-busqueda-de-productos-mediante-el-formulario)
3. [Navegación por categorías](#3-navegacion-por-categorias)
4. [Agregar productos al carrito y resumen dinámico](#4-agregar-productos-al-carrito-y-resumen-dinamico)
5. [Responsividad del menú de navegación](#5-responsividad-del-menu-de-navegacion)
6. [Responsividad del pie de página](#6-responsividad-del-pie-de-pagina)
7. [Caso de error A: producto no encontrado tras cambiar su nombre en los datos](#7-caso-de-error-a-producto-no-encontrado-tras-cambiar-su-nombre-en-los-datos)
8. [Caso de error B: fallo en la carga del catálogo](#8-caso-de-error-b-fallo-en-la-carga-del-catalogo)

## 1. Carga inicial de productos

Al ingresar al sitio se cargan y se muestran todos los productos del catálogo con su nombre y precio.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../assets/screenshots/e2e-carga-inicial-desktop.jpg" width="300" alt="Carga inicial de productos - Web (Desktop)" /> | <img src="../assets/screenshots/e2e-carga-inicial-tablet.jpg" width="300" alt="Carga inicial de productos - Tablet" /> | <img src="../assets/screenshots/e2e-carga-inicial-mobile.jpg" width="300" alt="Carga inicial de productos - Mobile" /> |

## 2. Búsqueda de productos mediante el formulario

Al buscar "mando" desde el formulario de búsqueda, el catálogo muestra únicamente el producto coincidente.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../assets/screenshots/e2e-busqueda-desktop.jpg" width="300" alt="Búsqueda de productos mediante el formulario - Web (Desktop)" /> | <img src="../assets/screenshots/e2e-busqueda-tablet.jpg" width="300" alt="Búsqueda de productos mediante el formulario - Tablet" /> | <img src="../assets/screenshots/e2e-busqueda-mobile.jpg" width="300" alt="Búsqueda de productos mediante el formulario - Mobile" /> |

## 3. Navegación por categorías

Al elegir la categoría "Consolas" en el menú de categorías, el catálogo se filtra y se indica la categoría activa.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../assets/screenshots/e2e-categorias-desktop.jpg" width="300" alt="Navegación por categorías - Web (Desktop)" /> | <img src="../assets/screenshots/e2e-categorias-tablet.jpg" width="300" alt="Navegación por categorías - Tablet" /> | <img src="../assets/screenshots/e2e-categorias-mobile.jpg" width="300" alt="Navegación por categorías - Mobile" /> |

## 4. Agregar productos al carrito y resumen dinámico

Al agregar productos, el panel del carrito muestra cantidades, subtotales y el total actualizados.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../assets/screenshots/e2e-carrito-desktop.jpg" width="300" alt="Agregar productos al carrito y resumen dinámico - Web (Desktop)" /> | <img src="../assets/screenshots/e2e-carrito-tablet.jpg" width="300" alt="Agregar productos al carrito y resumen dinámico - Tablet" /> | <img src="../assets/screenshots/e2e-carrito-mobile.jpg" width="300" alt="Agregar productos al carrito y resumen dinámico - Mobile" /> |

## 5. Responsividad del menú de navegación

El menú de navegación se muestra completo en Web y se recoge tras el botón de menú en Tablet y Mobile.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../assets/screenshots/e2e-responsividad-navbar-desktop.jpg" width="300" alt="Responsividad del menú de navegación - Web (Desktop)" /> | <img src="../assets/screenshots/e2e-responsividad-navbar-tablet.jpg" width="300" alt="Responsividad del menú de navegación - Tablet" /> | <img src="../assets/screenshots/e2e-responsividad-navbar-mobile.jpg" width="300" alt="Responsividad del menú de navegación - Mobile" /> |

## 6. Responsividad del pie de página

El pie de página muestra el formulario de contacto, el correo y los enlaces a redes sociales en todas las resoluciones.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../assets/screenshots/e2e-responsividad-footer-desktop.jpg" width="300" alt="Responsividad del pie de página - Web (Desktop)" /> | <img src="../assets/screenshots/e2e-responsividad-footer-tablet.jpg" width="300" alt="Responsividad del pie de página - Tablet" /> | <img src="../assets/screenshots/e2e-responsividad-footer-mobile.jpg" width="300" alt="Responsividad del pie de página - Mobile" /> |

## 7. Caso de error A: producto no encontrado tras cambiar su nombre en los datos

Se cambió temporalmente el nombre de un producto en los datos del catálogo; al buscar su nombre original el sitio informa de forma clara que no se encontraron productos.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../assets/screenshots/e2e-error-sin-coincidencia-desktop.jpg" width="300" alt="Caso de error A: producto no encontrado tras cambiar su nombre en los datos - Web (Desktop)" /> | <img src="../assets/screenshots/e2e-error-sin-coincidencia-tablet.jpg" width="300" alt="Caso de error A: producto no encontrado tras cambiar su nombre en los datos - Tablet" /> | <img src="../assets/screenshots/e2e-error-sin-coincidencia-mobile.jpg" width="300" alt="Caso de error A: producto no encontrado tras cambiar su nombre en los datos - Mobile" /> |

## 8. Caso de error B: fallo en la carga del catálogo

Se simuló temporalmente una falla en los datos del catálogo; el sitio muestra un mensaje amigable con el botón "Reintentar" y el resto de la página sigue funcionando.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../assets/screenshots/e2e-error-carga-desktop.jpg" width="300" alt="Caso de error B: fallo en la carga del catálogo - Web (Desktop)" /> | <img src="../assets/screenshots/e2e-error-carga-tablet.jpg" width="300" alt="Caso de error B: fallo en la carga del catálogo - Tablet" /> | <img src="../assets/screenshots/e2e-error-carga-mobile.jpg" width="300" alt="Caso de error B: fallo en la carga del catálogo - Mobile" /> |
