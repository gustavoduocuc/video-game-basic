# Evidencia de pruebas realizadas

Este documento reúne la evidencia de las pruebas realizadas sobre el sitio GameVault. Cada caso se verificó en las tres resoluciones indicadas y se adjunta su captura de pantalla.

## Resoluciones evaluadas

| Resolución | Tamaño de pantalla |
|------------|--------------------|
| Web (Desktop) | 1440 × 900 |
| Tablet | 768 × 1024 |
| Mobile | 412 × 839 |

## Navegadores y dispositivos probados

Todos los casos se ejecutaron en los siguientes navegadores. Las capturas de este documento corresponden a Google Chrome.

| Navegador | Motor | Dispositivos y resoluciones |
|-----------|-------|-----------------------------|
| Google Chrome | Chromium | Web 1440 × 900, Tablet 768 × 1024, Mobile 412 × 839 |
| Mozilla Firefox | Gecko | Web 1440 × 900 |
| Safari | WebKit | Web 1440 × 900, iPhone 13 (390 × 664) |

## Casos evaluados

1. [Carga inicial de productos](#1-carga-inicial-de-productos)
2. [Búsqueda de productos mediante el formulario](#2-busqueda-de-productos-mediante-el-formulario)
3. [Navegación por categorías](#3-navegacion-por-categorias)
4. [Filtro desde los accesos de categorías](#4-filtro-desde-los-accesos-de-categorias)
5. [Agregar productos al carrito y resumen dinámico](#5-agregar-productos-al-carrito-y-resumen-dinamico)
6. [Agregar videojuego: campos requeridos incompletos](#6-agregar-videojuego-campos-requeridos-incompletos)
7. [Agregar videojuego: alta exitosa](#7-agregar-videojuego-alta-exitosa)
8. [Eliminar videojuegos del catálogo](#8-eliminar-videojuegos-del-catalogo)
9. [Responsividad del menú de navegación](#9-responsividad-del-menu-de-navegacion)
10. [Responsividad de la sección de contacto y del pie de página](#10-responsividad-de-la-seccion-de-contacto-y-del-pie-de-pagina)
11. [Caso de error A: producto no encontrado tras cambiar su nombre en los datos](#11-caso-de-error-a-producto-no-encontrado-tras-cambiar-su-nombre-en-los-datos)
12. [Caso de error B: fallo en la carga del catálogo](#12-caso-de-error-b-fallo-en-la-carga-del-catalogo)
13. [Formulario de contacto: campos requeridos incompletos](#13-formulario-de-contacto-campos-requeridos-incompletos)
14. [Formulario de contacto: envío exitoso](#14-formulario-de-contacto-envio-exitoso)

## 1. Carga inicial de productos

Al ingresar al sitio se cargan y se muestran todos los productos del catálogo con su nombre y precio.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-carga-inicial-desktop.jpg" width="300" alt="Carga inicial de productos - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-carga-inicial-tablet.jpg" width="300" alt="Carga inicial de productos - Tablet" /> | <img src="../public/assets/screenshots/e2e-carga-inicial-mobile.jpg" width="300" alt="Carga inicial de productos - Mobile" /> |

## 2. Búsqueda de productos mediante el formulario

Al buscar "mando" desde el formulario de búsqueda, el catálogo muestra únicamente el producto coincidente.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-busqueda-desktop.jpg" width="300" alt="Búsqueda de productos mediante el formulario - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-busqueda-tablet.jpg" width="300" alt="Búsqueda de productos mediante el formulario - Tablet" /> | <img src="../public/assets/screenshots/e2e-busqueda-mobile.jpg" width="300" alt="Búsqueda de productos mediante el formulario - Mobile" /> |

## 3. Navegación por categorías

Al elegir la categoría "Consolas" en el menú de categorías, el catálogo se filtra y se indica la categoría activa.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-categorias-desktop.jpg" width="300" alt="Navegación por categorías - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-categorias-tablet.jpg" width="300" alt="Navegación por categorías - Tablet" /> | <img src="../public/assets/screenshots/e2e-categorias-mobile.jpg" width="300" alt="Navegación por categorías - Mobile" /> |

## 4. Filtro desde los accesos de categorías

Al elegir una categoría en la sección "Categorías de productos", el catálogo se filtra, el acceso queda marcado y se mantiene sincronizado con el menú de navegación.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-categorias-chips-desktop.jpg" width="300" alt="Filtro desde los accesos de categorías - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-categorias-chips-tablet.jpg" width="300" alt="Filtro desde los accesos de categorías - Tablet" /> | <img src="../public/assets/screenshots/e2e-categorias-chips-mobile.jpg" width="300" alt="Filtro desde los accesos de categorías - Mobile" /> |

## 5. Agregar productos al carrito y resumen dinámico

Al agregar productos, el panel del carrito muestra cantidades, subtotales y el total actualizados.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-carrito-desktop.jpg" width="300" alt="Agregar productos al carrito y resumen dinámico - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-carrito-tablet.jpg" width="300" alt="Agregar productos al carrito y resumen dinámico - Tablet" /> | <img src="../public/assets/screenshots/e2e-carrito-mobile.jpg" width="300" alt="Agregar productos al carrito y resumen dinámico - Mobile" /> |

## 6. Agregar videojuego: campos requeridos incompletos

Con el permiso de administración activo en la sesión, al intentar agregar un videojuego con el formulario vacío, el sitio marca los campos requeridos, informa que deben revisarse y no modifica el catálogo. Sin ese permiso, el botón "Agregar videojuego" no se muestra.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-alta-error-desktop.jpg" width="300" alt="Agregar videojuego: campos requeridos incompletos - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-alta-error-tablet.jpg" width="300" alt="Agregar videojuego: campos requeridos incompletos - Tablet" /> | <img src="../public/assets/screenshots/e2e-alta-error-mobile.jpg" width="300" alt="Agregar videojuego: campos requeridos incompletos - Mobile" /> |

## 7. Agregar videojuego: alta exitosa

Al completar nombre, categoría, precio y descripción, el nuevo videojuego aparece en el catálogo con una imagen genérica y respeta el filtro de categoría activo.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-alta-exito-desktop.jpg" width="300" alt="Agregar videojuego: alta exitosa - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-alta-exito-tablet.jpg" width="300" alt="Agregar videojuego: alta exitosa - Tablet" /> | <img src="../public/assets/screenshots/e2e-alta-exito-mobile.jpg" width="300" alt="Agregar videojuego: alta exitosa - Mobile" /> |

## 8. Eliminar videojuegos del catálogo

Con el permiso de administración activo en la sesión, al eliminar videojuegos desde su tarjeta, desaparecen del catálogo y del carrito, y el sitio confirma la eliminación. Sin ese permiso, el botón "Eliminar" no se muestra.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-baja-desktop.jpg" width="300" alt="Eliminar videojuegos del catálogo - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-baja-tablet.jpg" width="300" alt="Eliminar videojuegos del catálogo - Tablet" /> | <img src="../public/assets/screenshots/e2e-baja-mobile.jpg" width="300" alt="Eliminar videojuegos del catálogo - Mobile" /> |

## 9. Responsividad del menú de navegación

El menú de navegación se muestra completo en Web y se recoge tras el botón de menú en Tablet y Mobile.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-responsividad-navbar-desktop.jpg" width="300" alt="Responsividad del menú de navegación - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-responsividad-navbar-tablet.jpg" width="300" alt="Responsividad del menú de navegación - Tablet" /> | <img src="../public/assets/screenshots/e2e-responsividad-navbar-mobile.jpg" width="300" alt="Responsividad del menú de navegación - Mobile" /> |

## 10. Responsividad de la sección de contacto y del pie de página

La sección de contacto muestra su formulario y el pie de página muestra el correo y los enlaces a redes sociales en todas las resoluciones.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-responsividad-footer-desktop.jpg" width="300" alt="Responsividad de la sección de contacto y del pie de página - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-responsividad-footer-tablet.jpg" width="300" alt="Responsividad de la sección de contacto y del pie de página - Tablet" /> | <img src="../public/assets/screenshots/e2e-responsividad-footer-mobile.jpg" width="300" alt="Responsividad de la sección de contacto y del pie de página - Mobile" /> |

## 11. Caso de error A: producto no encontrado tras cambiar su nombre en los datos

Se cambió temporalmente el nombre de un producto en los datos del catálogo; al buscar su nombre original el sitio informa de forma clara que no se encontraron productos.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-error-sin-coincidencia-desktop.jpg" width="300" alt="Caso de error A: producto no encontrado tras cambiar su nombre en los datos - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-error-sin-coincidencia-tablet.jpg" width="300" alt="Caso de error A: producto no encontrado tras cambiar su nombre en los datos - Tablet" /> | <img src="../public/assets/screenshots/e2e-error-sin-coincidencia-mobile.jpg" width="300" alt="Caso de error A: producto no encontrado tras cambiar su nombre en los datos - Mobile" /> |

## 12. Caso de error B: fallo en la carga del catálogo

Se simuló temporalmente una falla en los datos del catálogo; el sitio muestra un mensaje amigable con el botón "Reintentar" y el resto de la página sigue funcionando.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-error-carga-desktop.jpg" width="300" alt="Caso de error B: fallo en la carga del catálogo - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-error-carga-tablet.jpg" width="300" alt="Caso de error B: fallo en la carga del catálogo - Tablet" /> | <img src="../public/assets/screenshots/e2e-error-carga-mobile.jpg" width="300" alt="Caso de error B: fallo en la carga del catálogo - Mobile" /> |

## 13. Formulario de contacto: campos requeridos incompletos

Al intentar enviar el formulario vacío, el sitio marca los campos requeridos e informa que deben revisarse antes de continuar.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-contacto-error-desktop.jpg" width="300" alt="Formulario de contacto: campos requeridos incompletos - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-contacto-error-tablet.jpg" width="300" alt="Formulario de contacto: campos requeridos incompletos - Tablet" /> | <img src="../public/assets/screenshots/e2e-contacto-error-mobile.jpg" width="300" alt="Formulario de contacto: campos requeridos incompletos - Mobile" /> |

## 14. Formulario de contacto: envío exitoso

Al completar nombre, correo electrónico y mensaje con datos válidos, el sitio confirma que el mensaje fue recibido.

| Web (Desktop) | Tablet | Mobile |
| --- | --- | --- |
| <img src="../public/assets/screenshots/e2e-contacto-exito-desktop.jpg" width="300" alt="Formulario de contacto: envío exitoso - Web (Desktop)" /> | <img src="../public/assets/screenshots/e2e-contacto-exito-tablet.jpg" width="300" alt="Formulario de contacto: envío exitoso - Tablet" /> | <img src="../public/assets/screenshots/e2e-contacto-exito-mobile.jpg" width="300" alt="Formulario de contacto: envío exitoso - Mobile" /> |
