import React from "react";
import MediaGrid from "../components/MediaGrid.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

export default function Galeria() {
  return (
    <main className="py-5 bg-light-soft min-vh-100">
      <div className="container">
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold text-dark-blue">Galería de Imágenes</h1>
          <p className="text-muted max-w-600 mx-auto">Descubre el diseño moderno y los espacios únicos de nuestra cabaña.</p>


        </div>

        <ErrorBoundary>
          <div className="animate-fade-in">
            <MediaGrid />
          </div>
        </ErrorBoundary>

        <div className="alert bg-white border-0 shadow-sm rounded-4 mt-5 p-4 text-center animate-fade-in">
          <p className="small text-muted m-0">
            <i className="bi bi-info-circle me-2" /> Todas las fotografías son reales y capturan la esencia de nuestra propiedad. Gestionado dinámicamente.
          </p>
        </div>
      </div>
    </main>
  );
}
