import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Hero(){
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [huespedes, setHuespedes] = useState(2)
  const [telefono, setTelefono] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const mensaje = `
      ¡Hola! Quisiera consultar la disponibilidad para las siguientes fechas:
      - Check-in: ${checkin}
      - Check-out: ${checkout}
      - Huéspedes: ${huespedes}
      - Mi teléfono es: ${telefono}
    `

    const url = `https://wa.me/573006806697?text=${encodeURIComponent(mensaje)}`
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
        src="/media/fondo.mp4"
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
              Cabaña frente al mar — diseño moderno, brisa eterna
            </h1>

            <p className="lead mb-4">
              Despierta con el sonido de las olas, camina 3 minutos a la playa y disfruta de una estancia cómoda con espacios pensados para descansar.
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
            <div className="card p-3 p-lg-4 position-relative">
              <div className="pricing-badge">
                <i className="bi bi-star-fill me-1" />4.95 / 120 reseñas
              </div>

              <h5 className="fw-semibold">Reserva rápida</h5>

              <form className="row g-3 mt-1" onSubmit={handleSubmit}>
                <div className="col-12 col-md-6">
                  <label className="form-label">Check-in</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={checkin}
                    onChange={e => setCheckin(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Check-out</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={checkout}
                    onChange={e => setCheckout(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Huéspedes</label>
                  <input 
                    type="number" 
                    min="1" 
                    className="form-control" 
                    value={huespedes}
                    onChange={e => setHuespedes(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Teléfono</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    placeholder="+57 ..." 
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-brand w-100 rounded-pill">
                    Consultar
                  </button>
                </div>

                <p className="small text-muted m-0">
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
