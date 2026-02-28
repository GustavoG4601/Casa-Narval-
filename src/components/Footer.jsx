
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="footer mt-auto py-5 border-top">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <h5 className="mb-1">Cabaña Playa</h5>
            <p className="mb-2">Tu refugio moderno frente al mar.</p>
            <div className="d-flex gap-3">
              <a className="link-secondary" href="#" aria-label="Instagram"><i className="bi bi-instagram" /></a>
              <a className="link-secondary" href="#" aria-label="Facebook"><i className="bi bi-facebook" /></a>
              <a className="link-secondary" href="#" aria-label="WhatsApp"><i className="bi bi-whatsapp" /></a>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-md-end">
            <ul className="list-unstyled small text-muted">
              <li><Link to="/politicas" className="link-secondary">Políticas y reglas</Link></li>
              <li><span>© {new Date().getFullYear()} Cabaña Playa</span></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
