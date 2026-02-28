import React, { useState } from "react";
import { sessions } from "../data/media.js";

export default function MediaGrid() {
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openGallery = (session) => {
    setSelectedSession(session);
    setSelectedIndex(0);
  };

  const closeGallery = () => {
    setSelectedSession(null);
    setSelectedIndex(0);
  };

  const nextImage = () => {
    if (!selectedSession) return;
    setSelectedIndex((prev) =>
      prev + 1 < selectedSession.images.length ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    if (!selectedSession) return;
    setSelectedIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : selectedSession.images.length - 1
    );
  };

  return (
    <>
      {/* GRID */}
      <div className="container my-5">
        <h2 className="h4 fw-bold mb-4">Galería destacada</h2>

        <div className="row g-3">
          {sessions.map((s) => (
            <div className="col-12 col-md-6 col-lg-4" key={s.id}>
              <div className="card border-0 shadow-sm h-100 overflow-hidden rounded-3">
                <div
                  className="w-100"
                  style={{
                    minHeight: "250px",
                    backgroundImage: `url(${s.mainImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="card-body text-center">
                  <h6 className="fw-semibold mb-2">{s.title}</h6>
                  <button
                    className="btn btn-sm btn-outline-primary rounded-pill"
                    onClick={() => openGallery(s)}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL LIGHTBOX */}
      {selectedSession && (
        <div
          className="gallery-modal"
          onClick={closeGallery}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Imagen */}
          <img
            src={selectedSession.images[selectedIndex].src}
            alt=""
            style={{
              maxHeight: "90vh",
              maxWidth: "90vw",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(0,0,0,.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Flecha izquierda */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            style={{
              position: "fixed",
              left: "30px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "30px",
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ‹
          </button>

          {/* Flecha derecha */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            style={{
              position: "fixed",
              right: "30px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "30px",
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ›
          </button>

          {/* Cerrar */}
          <button
            onClick={closeGallery}
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              fontSize: "28px",
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
