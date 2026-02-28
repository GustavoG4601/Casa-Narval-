
import { Link, NavLink } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="/favicon.svg" width="28" height="28" alt="logo" />
          <strong>Cabaña Playa</strong>
          <span className="badge badge-soft ms-2">Sitio Oficial</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsMain" aria-controls="navbarsMain" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsMain">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/galeria">Galería</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/precios">Precios</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/servicios">Servicios</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ubicacion">Ubicación</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/resenas">Reseñas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
          </ul>
          <div className="d-none d-lg-block ms-3">
            <Link className="btn btn-brand rounded-pill px-3" to="/precios"><i className="bi bi-calendar2-week me-2" />Reservar</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
