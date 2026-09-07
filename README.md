# GameVault

Tienda online de videojuegos, consolas y accesorios. Página estática construida con HTML semántico, CSS propio y **Bootstrap 5**.

## Sitio publicado

**GitHub Pages:** [https://gustavoduocuc.github.io/video-game-basic/](https://gustavoduocuc.github.io/video-game-basic/)

## Tecnologías

- HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- CSS3 con variables personalizadas (tema GameVault)
- **Bootstrap 5.3.8** vía CDN (jsDelivr)
  - Navbar responsiva con colapso (hamburguesa)
  - Carousel con autoplay, indicadores y controles
  - Sistema de grillas (`container` / `row` / `col-*`)
  - Cards para el catálogo de productos

## Contenido

| Archivo / carpeta | Descripción |
|-------------------|-------------|
| `index.html` | Página principal: navbar, carrusel, catálogo, categorías, ofertas y footer |
| `styles.css` | Overrides del tema y estilos propios (carga después de Bootstrap) |
| `assets/` | Imágenes SVG del logo y portadas de productos |

## Uso local

Abrir `index.html` directamente en el navegador (no requiere servidor ni instalación):

```bash
open index.html
```

Se necesita conexión a internet la primera vez para cargar Bootstrap desde el CDN.

## Componentes Bootstrap usados

1. **Navbar** (`navbar-expand-lg` + `navbar-toggler`): colapsa bajo 992px.
2. **Carousel** (`data-bs-ride="carousel"`, `data-bs-interval="5000"`): juegos destacados cada 5 s.
3. **Grid**: catálogo en `col-12 col-sm-6 col-lg-4`; categorías en `col-6 col-md-4 col-lg`.
4. **Cards**: productos con altura uniforme (`h-100`) y botones `btn-primary`.

## Estructura semántica

La página usa una jerarquía de encabezados `<h1>`–`<h3>`, listas para ofertas, enlaces descriptivos e imágenes con texto alternativo.

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

## Validación

HTML validado con https://jsonformatter.org/html-validator
