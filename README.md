
# Cabaña Playa — Sitio Oficial (React + Vite + Bootstrap)

Proyecto base moderno y profesional para mostrar una cabaña cerca de la playa, con secciones similares a Airbnb, pero con más control de marca.

## Requisitos
- Node.js 18+ y npm
- Visual Studio Code

## Cómo arrancar
```bash
npm install
npm run dev
```
Abre la URL local que indique Vite.

## Estructura
```
cabana-beach-site/
├─ public/
│  ├─ favicon.svg
│  └─ media/ (coloca tus fotos y videos)
├─ src/
│  ├─ components/ (Navbar, Hero, Amenities, etc.)
│  ├─ pages/ (Home, Galería, Precios, Servicios, Ubicación, Reseñas, Contacto, Políticas)
│  ├─ data/ (JSON con precios/planes)
│  ├─ styles/ (custom.css)
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html (Bootstrap via CDN + fuentes)
├─ package.json (Vite + React Router)
└─ vite.config.js
```

## Personalización rápida
- **Fotos/Videos**: coloca archivos en `public/media` y edita `src/components/MediaGrid.jsx`.
- **Precios**: edita `src/data/precios.json`.
- **Mapa**: reemplaza el `iframe` de Google Maps en `src/pages/Ubicacion.jsx`.
- **Colores/estilos**: modifica variables en `src/styles/custom.css`.
- **Redes/Contacto**: edita `Footer.jsx` y `Contacto.jsx`.

## SEO / Meta
- Cambia el `<title>` y `description` en `index.html`.
- Puedes agregar OpenGraph y favicons adicionales.

## Producción
```bash
npm run build
npm run preview
```
Sirve los archivos de `dist/` en tu hosting.
