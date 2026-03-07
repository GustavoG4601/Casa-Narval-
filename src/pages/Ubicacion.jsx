import { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'

export default function Ubicacion() {
  const { siteData } = useContext(AdminContext)
  const title = siteData?.location?.title || 'Ubicación & Entorno'
  const desc = siteData?.location?.description || 'Un refugio exclusivo rodeado de naturaleza, playa y tranquilidad.'
  const mapUrl = siteData?.location?.mapUrl || 'https://maps.app.goo.gl/KXG99mY51wy4YhY69?g_st=aw'
  const [mapLoaded, setMapLoaded] = useState(false)

  return (
    <main className="py-5 bg-light-soft min-vh-100">
      <div className="container">
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold text-dark-blue">{title}</h1>
          <p className="text-muted max-w-600 mx-auto">{desc}</p>
        </div>

        <div className="card border-0 shadow-lg rounded-4 rounded-lg-5 overflow-hidden animate-fade-in">
          <div className="ratio ratio-16x9 ratio-lg-21x9 position-relative">
            {!mapLoaded && <div className="skeleton position-absolute top-0 start-0 w-100 h-100" />}
            <iframe
              src={mapUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de la cabaña"
              className="border-0"
              onLoad={() => setMapLoaded(true)}
            ></iframe>
          </div>
        </div>

        <div className="row g-3 g-md-4 mt-4 animate-fade-in">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white text-center hover-up transition-all">
              <div className="bg-brand-light text-brand rounded-circle p-3 mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                <i className="bi bi-geo-alt-fill fs-3" />
              </div>
              <h5 className="fw-bold text-dark-blue">Ubicación</h5>
              <p className="text-muted small m-0">Km 25 Vía del Mar. A solo 20 min de la Zona Norte de Cartagena.</p>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white text-center hover-up transition-all">
              <div className="bg-brand-light text-brand rounded-circle p-3 mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                <i className="bi bi-cart-fill fs-3" />
              </div>
              <h5 className="fw-bold text-dark-blue">Compras</h5>
              <p className="text-muted small m-0">Tienda local a pasos del condominio. D1 y Carulla en la Zona Norte.</p>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white text-center hover-up transition-all">
              <div className="bg-brand-light text-brand rounded-circle p-3 mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                <i className="bi bi-car-front-fill fs-3" />
              </div>
              <h5 className="fw-bold text-dark-blue">Movilidad</h5>
              <p className="text-muted small m-0">Recomendamos transporte privado o taxi, especialmente de noche.</p>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white text-center hover-up transition-all">
              <div className="bg-brand-light text-brand rounded-circle p-3 mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                <i className="bi bi-signpost-split-fill fs-3" />
              </div>
              <h5 className="fw-bold text-dark-blue">Peajes</h5>
              <p className="text-muted small m-0">Para llegar desde Cartagena deberás pasar por 1 peaje.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
