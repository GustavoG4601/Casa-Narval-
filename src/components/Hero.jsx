import { Link } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'

export default function Hero(){
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [huespedes, setHuespedes] = useState(2)
  const [telefono, setTelefono] = useState('')
  const [avgRating, setAvgRating] = useState(4.95)
  const [totalReviews, setTotalReviews] = useState(120)
  const { siteData } = useContext(AdminContext)

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(reviews => {
        const avg = reviews.length > 0 
          ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
          : 4.95
        setAvgRating(avg)
        setTotalReviews(reviews.length)
      })
      .catch(err => console.error('Error cargando reseñas:', err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const mensaje = `
      ¡Hola! Quisiera consultar la disponibilidad para las siguientes fechas:
      - Check-in: ${checkin}
      - Check-out: ${checkout}
      - Huéspedes: ${huespedes}
      - Mi teléfono es: ${telefono}
    `

    const waNumber = siteData?.contact?.whatsapp || '573006806697'
    const cleanNumber = String(waNumber).replace(/^\+/, '').replace(/\s+/g, '')
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  return (
    <section 
      className="d-flex align-items-center text-white position-relative"
      style={{
        minHeight: "100vh",
        overflow: "hidden"
      }}
    >
      {/* VIDEO DE FONDO */}
      <video
        src="/public/media/fondo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="position-absolute w-100 h-100"
        style={{
          objectFit: "cover",
          top: 0,
          left: 0,
          zIndex: 0
        }}
      ></video>

      {/* CAPA OSCURA */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
          zIndex: 1
        }}
      ></div>

      {/* CONTENIDO */}
      <div className="container py-5" style={{ position: "relative", zIndex: 2 }}>
        <div className="row align-items-end">
          <div className="col-lg-7">
            <span className="badge badge-soft mb-3">
              <i className="bi bi-star-fill me-1" />Nueva publicación
            </span>

            <h1 className="display-5 fw-bold mb-3">
              {siteData?.hero?.title ?? 'Cabaña frente al mar — diseño moderno, brisa eterna'}
            </h1>

            <p className="lead mb-4">
              {siteData?.hero?.subtitle ?? 'Despierta con el sonido de las olas, camina 3 minutos a la playa y disfruta de una estancia cómoda con espacios pensados para descansar.'}
            </p>

            <div className="d-flex gap-2">
              <Link to="/precios" className="btn btn-brand btn-lg rounded-pill">
                Ver disponibilidad
              </Link>
              <Link to="/galeria" className="btn btn-outline-light btn-lg rounded-pill">
                Explorar galería
              </Link>
            </div>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <div className="card p-3 p-sm-4 position-relative">
              <div className="pricing-badge">
                <i className="bi bi-star-fill me-1" />{avgRating} / {totalReviews} reseñas
              </div>

              <h5 className="fw-semibold">Reserva rápida</h5>

              <form className="row g-2 g-sm-3 mt-1" onSubmit={handleSubmit}>
                <div className="col-12">
                  <label className="form-label small">Check-in</label>
                  <input 
                    type="date" 
                    className="form-control form-control-sm" 
                    value={checkin}
                    onChange={e => setCheckin(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small">Check-out</label>
                  <input 
                    type="date" 
                    className="form-control form-control-sm" 
                    value={checkout}
                    onChange={e => setCheckout(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small">Huéspedes</label>
                  <input 
                    type="number" 
                    min="1" 
                    className="form-control form-control-sm" 
                    value={huespedes}
                    onChange={e => setHuespedes(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small">Teléfono</label>
                  <input 
                    type="tel" 
                    className="form-control form-control-sm" 
                    placeholder="+57 ..." 
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-brand w-100 rounded-pill py-2">
                    Consultar
                  </button>
                </div>

                <p className="small text-muted m-0 text-center w-100">
                  Respuesta en menos de 1 hora.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
