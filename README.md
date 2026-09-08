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
<img width="1387" height="1296" alt="desktop-1" src="https://github.com/user-attachments/assets/34619841-ef21-4f35-a5d6-1eeedbdd9f18" />
<img width="1387" height="1293" alt="desktop-2" src="https://github.com/user-attachments/assets/e329078c-998c-40a5-8d19-60a7899b2c64" />
<img width="1383" height="1297" alt="desktop-3" src="https://github.com/user-attachments/assets/f277c961-f901-4444-ac8b-6efacb09489f" />

### Tablet
<img width="935" height="1301" alt="tablet-1" src="https://github.com/user-attachments/assets/f459c7f1-a1b3-4519-9299-900064a47b16" />
<img width="954" height="1296" alt="tablet-2" src="https://github.com/user-attachments/assets/e89ceec0-e280-4918-bad5-5f84fa1279f7" />
<img width="958" height="1298" alt="tablet-3" src="https://github.com/user-attachments/assets/6831a993-c46a-49f0-ac8c-059176d4f429" />

### Mobile
<img width="445" height="1297" alt="mobile-1" src="https://github.com/user-attachments/assets/1b0de3f0-32a6-4f4f-abff-2d622c30e066" />
<img width="434" height="1300" alt="mobile-3" src="https://github.com/user-attachments/assets/5742f38d-aec4-4336-82d0-15b8d22afdc0" />
<img width="449" height="1291" alt="mobile-2" src="https://github.com/user-attachments/assets/ef3d309f-893a-448e-85b9-e1a07fc3d0cc" />


## Validación

HTML validado con https://jsonformatter.org/html-validator
