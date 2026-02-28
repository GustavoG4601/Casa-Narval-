import Hero from '../components/Hero.jsx'
import AmenitiesGrid from '../components/AmenitiesGrid.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'

export default function Home(){
  const { siteData } = useContext(AdminContext)
  const FEATURE_IMAGE_SRC = siteData?.home?.featureImage || 'https://a0.muscache.com/im/pictures/hosting/Hosting-1163129382105020404/original/94870e90-3379-406e-85c8-b5b0800f0e27.jpeg?im_w=1440'
  const HEADING = siteData?.home?.heading || 'Espacios pensados para desconectar'
  const PAR = siteData?.home?.paragraph || 'Dormitorios luminosos, sala abierta, cocina equipada y una terraza perfecta para asados y atardeceres.'

  return (
    <main>
      <Hero />

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <img
                src={FEATURE_IMAGE_SRC}
                alt="Cabaña principal"
                className="w-100 rounded-4 shadow-sm"
              />
            </div>

            <div className="col-lg-6">
              <h2 className="fw-bold">{HEADING}</h2>
              <p className="text-muted">{PAR}</p>
              <div className="mt-3">
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
            <div className="col-md-4">
              <ReviewCard name="Carolina" date="2025-05" text="La cabaña es espectacular, súper limpia y con una vista soñada." rating={4.95} />
            </div>
            <div className="col-md-4">
              <ReviewCard name="Daniel" date="2025-03" text="Anfitriones atentos. A 3 min de la playa. Volveré." rating={4.90} />
            </div>
            <div className="col-md-4">
              <ReviewCard name="Laura" date="2025-02" text="Todo tal cual las fotos. La terraza es lo mejor." rating={5.00} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
