import { useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";

export default function AmenitiesGrid() {
  const { siteData } = useContext(AdminContext);

  // Use data from context with fallback to static if not yet loaded
  const available = siteData?.available || [];
  const notAvailable = siteData?.notAvailable || [];

  return (
    <div>
      {/* Servicios disponibles */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <h5 className="fw-bold m-0 text-dark-blue">Servicios Incluidos</h5>
        <div className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">Disponibles</div>
      </div>

      <div className="row g-4 mb-4">
        {available.map((it, idx) => (
          <div className="col-md-6 col-lg-4" key={idx}>
            <div className="card h-100 border-0 bg-light-soft p-4 rounded-4 hover-up shadow-none border border-transparent hover-border-info transition-all shadow-sm">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-brand rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: 45, height: 45 }}>
                  <i className={`bi bi-${it.icon} fs-4 text-white`} />
                </div>
                <h6 className="fw-bold m-0 text-dark-blue">{it.title}</h6>
              </div>
              <p className="small text-muted mb-0 lh-base">{it.text}</p>
            </div>
          </div>
        ))}
      </div>

      {available.length === 0 && (
        <div className="text-center py-4 bg-light rounded-4">
          <p className="m-0 text-muted small">No hay servicios disponibles cargados.</p>
        </div>
      )}

      {/* Servicios no disponibles */}
      {notAvailable.length > 0 && (
        <>
          <div className="d-flex align-items-center gap-3 mb-4 mt-5">
            <h5 className="fw-bold m-0 text-dark-blue">Consideraciones</h5>
            <div className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3">No dispone</div>
          </div>

          <div className="row g-4 mb-3">
            {notAvailable.map((it, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="card h-100 border-0 bg-light p-4 rounded-4 opacity-75 shadow-sm">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="bg-secondary bg-opacity-10 rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: 45, height: 45 }}>
                      <i className={`bi bi-${it.icon} fs-4 text-muted`} />
                    </div>
                    <h6 className="fw-bold m-0 text-muted">{it.title}</h6>
                  </div>
                  <p className="small text-muted mb-0 lh-base">{it.text}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
