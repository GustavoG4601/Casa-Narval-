import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'

export default function Navbar() {
  const { isAdmin } = useContext(AdminContext)

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="bg-brand rounded-3 p-1 d-flex align-items-center justify-content-center" style={{ width: 34, height: 34 }}>
            <img src="/favicon.svg" width="22" height="22" alt="logo" />
          </div>
          <div className="d-flex flex-column lh-1">
            <strong className="text-dark-blue fw-bold" style={{ fontSize: '1.2rem' }}>Cabaña Playa</strong>
            <span className="small text-muted" style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Sitio Oficial</span>
          </div>
        </Link>
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsMain" aria-controls="navbarsMain" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsMain">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
            <li className="nav-item"><NavLink className="nav-link fw-medium" to="/galeria">Galería</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link fw-medium" to="/precios">Precios</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link fw-medium" to="/servicios">Servicios</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link fw-medium" to="/ubicacion">Ubicación</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link fw-medium" to="/resenas">Reseñas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link fw-medium" to="/contacto">Contacto</NavLink></li>
          </ul>
          <div className="d-flex align-items-center ms-3 gap-3">
            <Link className="btn btn-brand text-white rounded-pill px-4 fw-bold shadow-sm" to="/precios">
              <i className="bi bi-calendar2-week me-2" />Reservar
            </Link>
            <Link to="/admin" className={`btn ${isAdmin ? 'btn-info text-white' : 'btn-outline-secondary'} rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm`} title="Administrador" style={{ width: 42, height: 42 }}>
              <i className="bi bi-person-circle" style={{ fontSize: '1.25rem' }} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
