import React from "react";
import MediaGrid from "../components/MediaGrid.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

export default function Galeria() {
  return (
    <main className="py-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h3 m-0">Galería</h1>
          <span className="text-muted">Fotos y videos</span>
        </div>

        <ErrorBoundary>
          <MediaGrid />
        </ErrorBoundary>

        <p className="small text-muted mt-3">
          Sugerencia: agrega fotos en <code>/public/media</code> y actualiza el
          arreglo dentro de <code>src/data/media.js</code>.
        </p>
      </div>
    </main>
  );
}
