import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'

export default function Precios() {
  const { siteData } = useContext(AdminContext)
  const plans = siteData?.plans || []

  return (
    <main className="py-5 bg-light-soft">
      <div className="container">
        <div className="text-center mb-5 animate-fade-in">
          <h2 className="display-5 fw-bold text-dark-blue">Disponibilidad & Tarifas</h2>
          <p className="text-muted max-w-600 mx-auto">Selecciona la temporada que mejor se adapte a tus planes. Gestionado según la demanda de la temporada.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {plans.length > 0 ? (
            plans.map((p, i) => (
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
                    <button className={`btn w-100 rounded-pill py-2 fw-bold ${i === 1 ? 'btn-info text-white' : 'btn-outline-info'}`}>
                      Reservar Ahora
                    </button>
                  </div>
                </div>
              </div>
            ))
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
