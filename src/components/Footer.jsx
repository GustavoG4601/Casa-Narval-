
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext.jsx'
export default function Footer(){
  const { siteData } = useContext(AdminContext)
  const contact = siteData?.contact || {}
  const insta = contact.instagram ? `https://instagram.com/${contact.instagram}` : '#'
  const wa = contact.whatsapp ? `https://api.whatsapp.com/send?phone=${contact.whatsapp}` : '#'
  const email = contact.email ? `mailto:${contact.email}` : '#'

  return (
    <footer className="footer mt-auto py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-md-4">
            <h5 className="mb-3 text-white">Casa Narval</h5>
            <p className="text-white-50">Tu refugio moderno frente al mar. Reserva con nosotros en cualquier momento.</p>
            <div className="d-flex gap-3 mt-3">
              {contact.instagram && (
                <a className="text-white-50 hover-opacity" href={insta} target="_blank" rel="noopener" aria-label="Instagram">
                  <i className="bi bi-instagram fs-4" />
                </a>
              )}
              {contact.facebook && (
                <a className="text-white-50 hover-opacity" href={contact.facebook} target="_blank" rel="noopener" aria-label="Facebook">
                  <i className="bi bi-facebook fs-4" />
                </a>
              )}
              {contact.whatsapp && (
                <a className="text-white-50 hover-opacity" href={wa} target="_blank" rel="noopener" aria-label="WhatsApp">
                  <i className="bi bi-whatsapp fs-4" />
                </a>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <h6 className="text-white">Enlaces útiles</h6>
            <ul className="list-unstyled">
              <li><Link to="/galeria" className="text-white-50 hover-opacity">Galería</Link></li>
              <li><Link to="/precios" className="text-white-50 hover-opacity">Precios</Link></li>
              <li><Link to="/politicas" className="text-white-50 hover-opacity">Políticas</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="text-white">Contacto</h6>
            <ul className="list-unstyled text-white-50">
              {contact.email && <li><a href={email} className="text-white-50 hover-opacity">{contact.email}</a></li>}
              {contact.whatsapp && <li><a href={wa} className="text-white-50 hover-opacity">WhatsApp</a></li>}
            </ul>
            <form className="mt-3 d-flex">
              <input type="email" placeholder="Suscríbete" className="form-control form-control-sm me-2" />
              <button className="btn btn-outline-light btn-sm">OK</button>
            </form>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex justify-content-between small text-white-50">
          <span>© {new Date().getFullYear()} Casa Narval</span>
          <span>Hecho con ❤️</span>
        </div>
      </div>
    </footer>
  )
}
