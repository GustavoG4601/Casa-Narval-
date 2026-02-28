import React, { useState, useContext, useEffect, useCallback } from "react";
import { AdminContext } from "../context/AdminContext";

export default function MediaGrid() {
  const { siteData, loading } = useContext(AdminContext);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  // Normalize sessions array
  const sessions = siteData?.sessions || [];

  const openGallery = (session, index = 0) => {
    if (!session?.images?.length) return;
    setSelectedSession(session);
    setSelectedIndex(index);
  };

  const closeGallery = useCallback(() => {
    setSelectedSession(null);
    setSelectedIndex(0);
  }, []);

  const nextImage = useCallback(() => {
    if (!selectedSession?.images?.length) return;
    setIsChanging(true);
    setTimeout(() => {
      setSelectedIndex((prev) => (prev + 1 < selectedSession.images.length ? prev + 1 : 0));
      setIsChanging(false);
    }, 200);
  }, [selectedSession]);

  const prevImage = useCallback(() => {
    if (!selectedSession?.images?.length) return;
    setIsChanging(true);
    setTimeout(() => {
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : selectedSession.images.length - 1));
      setIsChanging(false);
    }, 200);
  }, [selectedSession]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedSession) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeGallery();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSession, nextImage, prevImage, closeGallery]);

  if (loading) {
    return (
      <div className="text-center py-5 my-5">
        <div className="spinner-border text-info mb-3" role="status"></div>
        <p className="text-muted">Cargando galería...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid px-lg-5 my-5">
        <div className="gallery-sections-wrapper">
          {sessions.length > 0 ? (
            sessions.map((s, sIdx) => (
              <div className="gallery-session-section mb-5 animate-fade-in" style={{ animationDelay: `${sIdx * 0.1}s` }} key={s.id || sIdx}>
                <div className="d-flex align-items-center mb-4">
                  <h3 className="fw-bold m-0 text-dark-blue">{s.title || 'Sesión sin título'}</h3>
                  <span className="badge bg-info text-white rounded-pill ms-3 px-3 py-2 shadow-sm">{s.images?.length || 0} fotos</span>
                </div>

                {s.images?.length > 0 ? (
                  <div className="row g-3">
                    {s.images.map((img, imgIdx) => (
                      <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={imgIdx}>
                        <div
                          className="gallery-image-wrapper rounded-4 overflow-hidden shadow-sm cursor-pointer position-relative hover-up transition-all h-100"
                          onClick={() => openGallery(s, imgIdx)}
                          style={{ aspectRatio: '4/3' }}
                        >
                          <img
                            src={img.src}
                            alt={img.title || 'Foto de la galería'}
                            className="w-100 h-100 object-fit-cover transition-all gallery-img-hover"
                          />
                          <div className="gallery-img-overlay position-absolute inset-0 d-flex align-items-center justify-content-center opacity-0 transition-all">
                            <i className="bi bi-zoom-in text-white fs-2 shadow-sm"></i>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-white rounded-4 shadow-sm border border-light text-center">
                    <p className="text-muted m-0"><i className="bi bi-info-circle me-2"></i>No hay fotos en esta sesión.</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <div className="p-5 bg-white rounded-5 shadow-sm border border-info border-opacity-25 max-w-600 mx-auto">
                <i className="bi bi-camera fs-1 border-opacity-25 d-block mb-3 opacity-25" />
                <h5 className="fw-bold text-dark-blue">Todavía no hay fotos</h5>
                <p className="text-muted">Entra al panel de administración para añadir tus primeras sesiones de fotos.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PREMIUM CAROUSEL LIGHTBOX */}
      {selectedSession && selectedSession.images && selectedSession.images.length > 0 && (
        <div className="gallery-modal-overlay active" onClick={closeGallery}>
          <div className="gallery-modal-container glass-carousel" onClick={e => e.stopPropagation()}>
            <button className="gallery-close-btn-round shadow" style={{ zIndex: 120 }} onClick={closeGallery}>
              <i className="bi bi-x-lg" />
            </button>

            <div className="gallery-stage">
              {selectedSession.images.length > 1 && (
                <button className="gallery-arrow prev shadow-lg" onClick={prevImage}>
                  <i className="bi bi-chevron-left" />
                </button>
              )}

              <div className={`gallery-main-container ${isChanging ? 'fade-blur' : ''}`}>
                <img
                  src={selectedSession.images[selectedIndex].src}
                  alt={selectedSession.images[selectedIndex].title}
                  className="gallery-img-featured shadow-2xl"
                />

                <div className="gallery-footer-inline px-3 pt-3 animate-slide-up" style={{ width: '85%' }}>
                  <div className="d-flex justify-content-between align-items-end mb-2">
                    <div>
                      <span className="badge bg-white text-dark-blue rounded-pill px-3 py-2 mb-2 shadow-sm">
                        {selectedIndex + 1} / {selectedSession.images.length}
                      </span>
                      <h5 className="text-white m-0 fw-bold text-shadow">{selectedSession.title}</h5>
                      <p className="text-white m-0 small italic text-shadow">"{selectedSession.images[selectedIndex].title || 'Propiedad Cabana Beach'}"</p>
                    </div>
                    <div className="d-none d-md-block text-end">
                      <p className="text-white small m-0 mb-1 font-monospace text-shadow">← → para navegar</p>
                    </div>
                  </div>

                  <div className="gallery-filmstrip d-flex gap-2 overflow-auto pb-2">
                    {selectedSession.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`filmstrip-item shadow-sm ${selectedIndex === idx ? 'active border-white' : ''}`}
                        onClick={() => setSelectedIndex(idx)}
                      >
                        <img src={img.src} alt="thumbnail" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedSession.images.length > 1 && (
                <button className="gallery-arrow next shadow-lg" onClick={nextImage}>
                  <i className="bi bi-chevron-right" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
