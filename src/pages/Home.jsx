import Hero from '../components/Hero.jsx'
import AmenitiesGrid from '../components/AmenitiesGrid.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import ImageWithSkeleton from '../components/ImageWithSkeleton.jsx'
import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'

export default function Home() {
  const { siteData } = useContext(AdminContext)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error('Error cargando reseñas:', err))
  }, [])

  const FEATURE_IMAGE_SRC = siteData?.home?.featureImage || 'https://a0.muscache.com/im/pictures/hosting/Hosting-1163129382105020404/original/94870e90-3379-406e-85c8-b5b0800f0e27.jpeg?im_w=1440'
  const HEADING = siteData?.home?.heading || 'Espacios pensados para desconectar'
  const PAR = siteData?.home?.paragraph || 'Dormitorios luminosos, sala abierta, cocina equipada y una terraza perfecta para asados y atardeceres.'

  return (
    <main>
      <Hero />

      <section className="py-4 py-md-5">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-5 order-2 order-lg-1">
              <ImageWithSkeleton
                src={FEATURE_IMAGE_SRC}
                alt="Cabaña principal"
                className="w-100 rounded-4 shadow-sm"
              />
            </div>

            <div className="col-lg-7 order-1 order-lg-2">
              <h2 className="fw-bold mb-3">{HEADING}</h2>
              <p className="text-muted mb-4 lh-lg">{PAR}</p>

              {/* Destacados */}
              <div className="row g-3 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-brand-light rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: 45, height: 45 }}>
                      <i className="bi bi-geo-alt-fill text-brand fs-5" />
                    </div>
                    <div>
                      <p className="small text-muted m-0">Ubicación</p>
                      <h6 className="m-0 fw-bold small">A 3 min de la playa</h6>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-brand-light rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: 45, height: 45 }}>
                      <i className="bi bi-people-fill text-brand fs-5" />
                    </div>
                    <div>
                      <p className="small text-muted m-0">Capacidad</p>
                      <h6 className="m-0 fw-bold small">Hasta 4 huéspedes</h6>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-brand-light rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: 45, height: 45 }}>
                      <i className="bi bi-wifi text-brand fs-5" />
                    </div>
                    <div>
                      <p className="small text-muted m-0">Conectividad</p>
                      <h6 className="m-0 fw-bold small">WiFi de alta velocidad</h6>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-brand-light rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: 45, height: 45 }}>
                      <i className="bi bi-calendar-check-fill text-brand fs-5" />
                    </div>
                    <div>
                      <p className="small text-muted m-0">Disponibilidad</p>
                      <h6 className="m-0 fw-bold small">Todo el año</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Link to="/galeria" className="btn btn-outline-primary rounded-pill">
                  Ver galería completa
                </Link>
              </div>
            </div>
          </div>

          <hr className="my-5" />

          <h3 className="fw-semibold mb-3">Servicios destacados</h3>
          <AmenitiesGrid />

          <hr className="my-5" />

          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3 className="fw-semibold m-0">Reseñas recientes</h3>
            <Link to="/resenas" className="link-primary">Ver todas</Link>
          </div>

          <div className="row g-3">
            {reviews.slice(0, 3).map((review, idx) => (
              <div className="col-md-4" key={idx}>
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
