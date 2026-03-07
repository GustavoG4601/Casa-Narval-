
export default function Politicas() {
  return (
    <main className="py-5 bg-light-soft min-vh-100">
      <div className="container py-4">
        {/* Header Section */}
        <div className="text-center mb-5 animate-fade-in">
          <span className="badge-soft px-3 py-2 rounded-pill small fw-bold text-brand mb-3 d-inline-block">
            <i className="bi bi-shield-check me-2"></i>REGLAS DE LA CASA
          </span>
          <h1 className="display-4 fw-bold text-dark-blue mb-3">Políticas & Normas</h1>
          <p className="text-muted max-w-600 mx-auto fs-5">
            Para garantizar una estancia segura y agradable para todos nuestros huéspedes, te pedimos seguir estas recomendaciones.
          </p>
        </div>

        <div className="row g-4 animate-fade-in">
          {/* Horarios Card */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-brand-light p-3 rounded-circle text-brand">
                  <i className="bi bi-clock-history fs-4"></i>
                </div>
                <h5 className="fw-bold m-0 text-dark-blue">Horarios</h5>
              </div>
              <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                <li className="d-flex gap-2">
                  <i className="bi bi-check2-circle text-brand"></i>
                  <span><strong>Check-in:</strong> 3:00 PM</span>
                </li>
                <li className="d-flex gap-2">
                  <i className="bi bi-check2-circle text-brand"></i>
                  <span><strong>Check-out:</strong> 1:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Reglas de la Piscina */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white border-top border-brand border-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-brand-light p-3 rounded-circle text-brand">
                  <i className="bi bi-water fs-4"></i>
                </div>
                <h5 className="fw-bold m-0 text-dark-blue">Reglas de Piscina</h5>
              </div>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0 small text-muted">
                <li className="d-flex gap-2">
                  <i className="bi bi-x-circle text-danger"></i>
                  <span>Prohibido llevar vidrio al área de piscina.</span>
                </li>
                <li className="d-flex gap-2">
                  <i className="bi bi-x-circle text-danger"></i>
                  <span>No ingresar alimentos dentro del agua.</span>
                </li>
                <li className="d-flex gap-2">
                  <i className="bi bi-exclamation-triangle-fill text-warning"></i>
                  <span>Niños deben estar siempre supervisados.</span>
                </li>
                <li className="d-flex gap-2">
                  <i className="bi bi-info-circle text-brand"></i>
                  <span>Dúchate antes de ingresar (especialmente si vienes de la playa).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Normas de Convivencia */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-brand-light p-3 rounded-circle text-brand">
                  <i className="bi bi-people-fill fs-4"></i>
                </div>
                <h5 className="fw-bold m-0 text-dark-blue">Convivencia</h5>
              </div>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0 small text-muted">
                <li className="d-flex gap-2">
                  <i className="bi bi-nosmoke text-danger"></i>
                  <span>Prohibido fumar dentro de la casa (solo vape en exteriores).</span>
                </li>
                <li className="d-flex gap-2">
                  <i className="bi bi-volume-down text-brand"></i>
                  <span>Evitar ruidos excesivos para respetar a los vecinos.</span>
                </li>
                <li className="d-flex gap-2">
                  <i className="bi bi-tree text-success"></i>
                  <span>No tirar colillas ni residuos en las zonas verdes.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Recomendaciones y Sostenibilidad */}
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="row g-4 align-items-center">
                <div className="col-md-6 border-end-md">
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-brand-light p-3 rounded-4 text-brand">
                      <i className="bi bi-lightning-charge-fill fs-3"></i>
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark-blue">Ahorro de Energía</h5>
                      <p className="text-muted small m-0">
                        Te agradecemos apagar los aires acondicionados cuando no estés usando las habitaciones. Esto ayuda al medio ambiente y al buen funcionamiento de los equipos.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-warning bg-opacity-10 p-3 rounded-4 text-warning">
                      <i className="bi bi-bug-fill fs-3"></i>
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark-blue">Naturaleza & Entorno</h5>
                      <p className="text-muted small m-0">
                        Por nuestra ubicación natural, en ocasiones pueden aparecer zancudos. Recomendamos usar repelente, especialmente en la tarde/noche.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
