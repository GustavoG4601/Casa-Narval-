import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'

export default function Precios() {
  const { siteData } = useContext(AdminContext)
  const plans = siteData?.plans || []

  const whatsapp = siteData?.contact?.whatsapp || ''

  return (
    <main className="py-5 bg-light-soft">
      <div className="container">
        <div className="text-center mb-5 animate-fade-in">
          <h2 className="display-5 fw-bold text-dark-blue">Reserva y Disponibilidad</h2>
          <p className="text-muted max-w-600 mx-auto">Consulta nuestro calendario y elige la temporada que mejor se adapte a tus planes.</p>
        </div>

        {/* Google Calendar Section First */}
        {siteData?.calendar?.embedUrl && (
          <div className="mb-5 pb-5 animate-fade-in">
            <div className="text-center mb-4">
              <h3 className="fw-bold text-dark-blue">Calendario de Disponibilidad</h3>
              <p className="text-muted">Consulta los días ocupados antes de planear tu reserva.</p>
            </div>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden p-2 bg-white">
              <iframe
                src={siteData.calendar.embedUrl}
                style={{ border: '0', width: '100%', height: '600px', minHeight: '400px' }}
                frameBorder="0"
                scrolling="no"
                title="Google Calendar"
              ></iframe>
            </div>
            <div className="mt-3 text-center">
              <span className="badge bg-light text-muted border px-3 py-2 rounded-pill">
                <i className="bi bi-info-circle me-1"></i>
                Los días marcados en el calendario ya no están disponibles.
              </span>
            </div>
          </div>
        )}

        <div className="text-center mb-4 animate-fade-in">
          <h3 className="fw-bold text-dark-blue">Tarifas por Temporada</h3>
          <p className="text-muted">Precios ajustados según la demanda de la temporada.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {plans.length > 0 ? (
            plans.map((p, i) => {
              const msg = encodeURIComponent(`Hola! Me interesa el plan "${p.name}" a $${p.price.toLocaleString()} por noche.`)
              const href = whatsapp
                ? `https://api.whatsapp.com/send?phone=${whatsapp}&text=${msg}`
                : '/contacto'

              return (
                <div className="col-12 col-md-6 col-lg-4" key={i}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover">
                    <div className={`p-4 ${i === 1 ? 'bg-info text-white' : 'bg-white'}`}>
                      <h5 className="fw-bold mb-1">{p.name}</h5>
                      <p className={`small m-0 ${i === 1 ? 'text-white-50' : 'text-muted'}`}>{p.desc}</p>
                    </div>
                    <div className="card-body p-4 bg-white">
                      <div className="d-flex align-items-baseline gap-2 mb-4">
                        <h2 className="fw-bold mb-0">${p.price.toLocaleString()}</h2>
                        <span className="text-muted small">/ noche</span>
                      </div>
                      <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                        {p.includes?.map((x, idx) => (
                          <li key={idx} className="small d-flex align-items-center gap-2">
                            <i className="bi bi-check-circle-fill text-success" /> {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="card-footer p-4 pt-0 bg-white border-0">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn w-100 rounded-pill py-2 fw-bold ${i === 1 ? 'btn-info text-white' : 'btn-outline-info'}`}
                      >
                        Reservar Ahora
                      </a>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-5 w-100">
              <div className="spinner-border text-info" />
              <p className="mt-2 text-muted">Cargando tarifas...</p>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
