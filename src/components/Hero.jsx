import { Link } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import DatePicker, { registerLocale } from 'react-datepicker'
import { es } from 'date-fns/locale'
import { addDays, format, parseISO } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('es', es)

export default function Hero() {
  const [checkin, setCheckin] = useState(null)
  const [checkout, setCheckout] = useState(null)
  const [huespedes, setHuespedes] = useState(2)
  const [telefono, setTelefono] = useState('')
  const [avgRating, setAvgRating] = useState(4.95)
  const [totalReviews, setTotalReviews] = useState(120)
  const [busyDates, setBusyDates] = useState([])
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

  // Sync Calendar
  useEffect(() => {
    const calendarId = siteData?.calendar?.publicId
    if (calendarId) {
      fetch(`/api/calendar?id=${encodeURIComponent(calendarId)}`)
        .then(res => res.json())
        .then(data => {
          if (data.busy) {
            const parsed = data.busy.map(d => parseISO(d))
            setBusyDates(parsed)
          }
        })
        .catch(err => console.error('Error syncing calendar:', err))
    }
  }, [siteData?.calendar?.publicId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!checkin || !checkout) return alert('Por favor selecciona las fechas')

    const mensaje = `
      ¡Hola! Quisiera consultar la disponibilidad para las siguientes fechas:
      - Check-in: ${format(checkin, 'yyyy-MM-dd')}
      - Check-out: ${format(checkout, 'yyyy-MM-dd')}
      - Huéspedes: ${huespedes}
      - Mi teléfono es: ${telefono}
    `

    const waNumber = siteData?.contact?.whatsapp || '573046601648'
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
              {siteData?.hero?.title ?? 'Hotel frente al mar — diseño moderno, brisa eterna'}
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
            <div className="card p-3 p-sm-4 position-relative border-0 shadow-lg booking-card">
              <div className="pricing-badge">
                <i className="bi bi-star-fill me-1" />{avgRating} / {totalReviews} reseñas
              </div>

              <h5 className="fw-semibold mb-1 text-dark">Reserva rápida</h5>
              <p className="small text-muted mb-3">Bloquea tus fechas preferidas</p>

              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-6">
                  <label className="form-label small text-muted mb-1">Check-in</label>
                  <DatePicker
                    selected={checkin}
                    onChange={date => setCheckin(date)}
                    selectsStart
                    startDate={checkin}
                    endDate={checkout}
                    minDate={new Date()}
                    excludeDates={busyDates}
                    placeholderText="Fecha entrada"
                    className="form-control form-control-sm"
                    locale="es"
                    dateFormat="dd/MM/yyyy"
                    required
                  />
                </div>

                <div className="col-6">
                  <label className="form-label small text-muted mb-1">Check-out</label>
                  <DatePicker
                    selected={checkout}
                    onChange={date => setCheckout(date)}
                    selectsEnd
                    startDate={checkin}
                    endDate={checkout}
                    minDate={checkin || new Date()}
                    excludeDates={busyDates}
                    placeholderText="Fecha salida"
                    className="form-control form-control-sm"
                    locale="es"
                    dateFormat="dd/MM/yyyy"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small text-muted mb-1">Huéspedes</label>
                  <div className="input-group input-group-sm">
                    <span className="input-group-text bg-white"><i className="bi bi-people" /></span>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      className="form-control"
                      value={huespedes}
                      onChange={e => setHuespedes(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label small text-muted mb-1">Teléfono</label>
                  <div className="input-group input-group-sm">
                    <span className="input-group-text bg-white"><i className="bi bi-whatsapp" /></span>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+57 ..."
                      value={telefono}
                      onChange={e => setTelefono(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12 pt-2">
                  <button type="submit" className="btn btn-brand w-100 rounded-pill py-2 fw-bold shadow-sm">
                    Consultar Disponibilidad
                  </button>
                </div>

                <p className="small text-muted m-0 text-center w-100">
                  <i className="bi bi-lightning-fill text-warning me-1"></i>
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
