import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext.jsx'

export default function Footer() {
  const { siteData } = useContext(AdminContext)
  const contact = siteData?.contact || {}
  const insta = contact.instagram ? `https://instagram.com/${contact.instagram}` : '#'
  const wa = contact.whatsapp ? `https://api.whatsapp.com/send?phone=${contact.whatsapp}` : '#'
  const email = contact.email ? `mailto:${contact.email}` : '#'

  const navLinks = [
    { label: 'Galería', to: '/galeria' },
    { label: 'Disponibilidad', to: '/precios' },
    { label: 'Servicios', to: '/servicios' },
    { label: 'Ubicación', to: '/ubicacion' },
    { label: 'Reseñas', to: '/resenas' },
    { label: 'Políticas', to: '/politicas' },
    { label: 'Preguntas Frecuentes', to: '/faq' },
  ]

  return (
    <footer className="footer pt-5 pb-4">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-4 text-dark-blue fw-bold d-flex align-items-center gap-2">
              <div className="bg-brand rounded-2 p-1 d-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}>
                <i className="bi bi-water text-white fs-6"></i>
              </div>
              Casa Narval
            </h5>
            <p className="footer-link small mb-4 pe-lg-4">
              {siteData?.hero?.subtitle || 'Experimenta el paraíso moderno en nuestra Hotel frente al mar. Diseño, confort y la mejor vista del Caribe.'}
            </p>
            <div className="d-flex gap-3 mt-4">
              {contact.instagram && (
                <a className="social-icon-wrapper" href={insta} target="_blank" rel="noopener" aria-label="Instagram">
                  <i className="bi bi-instagram" />
                </a>
              )}
              {contact.facebook && (
                <a className="social-icon-wrapper" href={contact.facebook} target="_blank" rel="noopener" aria-label="Facebook">
                  <i className="bi bi-facebook" />
                </a>
              )}
              {contact.whatsapp && (
                <a className="social-icon-wrapper" href={wa} target="_blank" rel="noopener" aria-label="WhatsApp">
                  <i className="bi bi-whatsapp" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="col-lg-4 col-md-6 ps-lg-5">
            <h6 className="text-dark-blue fw-bold mb-4">Navegación</h6>
            <div className="row g-2">
              <div className="col-6">
                <ul className="list-unstyled">
                  {navLinks.slice(0, Math.ceil(navLinks.length / 2)).map((link, idx) => (
                    <li key={idx} className="mb-2">
                      <Link to={link.to} className="footer-link small text-decoration-none d-flex align-items-center gap-2">
                        <i className="bi bi-chevron-right small opacity-50 text-brand"></i> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled">
                  {navLinks.slice(Math.ceil(navLinks.length / 2)).map((link, idx) => (
                    <li key={idx} className="mb-2">
                      <Link to={link.to} className="footer-link small text-decoration-none d-flex align-items-center gap-2">
                        <i className="bi bi-chevron-right small opacity-50 text-brand"></i> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Column */}
          <div className="col-lg-4 col-md-12">
            <h6 className="text-dark-blue fw-bold mb-4">Contáctanos</h6>
            <ul className="list-unstyled mb-4">
              {contact.email && (
                <li className="mb-3">
                  <a href={email} className="footer-link small d-flex align-items-center gap-3">
                    <div className="social-icon-wrapper" style={{ width: 32, height: 32 }}>
                      <i className="bi bi-envelope fs-6"></i>
                    </div>
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.whatsapp && (
                <li className="mb-3">
                  <a href={wa} className="footer-link small d-flex align-items-center gap-3">
                    <div className="social-icon-wrapper" style={{ width: 32, height: 32 }}>
                      <i className="bi bi-whatsapp fs-6"></i>
                    </div>
                    Escríbenos por WhatsApp
                  </a>
                </li>
              )}
            </ul>

            <div className="p-3 rounded-4 bg-brand bg-opacity-10 border border-brand border-opacity-10 mt-3">
              <p className="small text-dark-blue opacity-75 mb-0">
                <i className="bi bi-clock-fill me-2 text-brand"></i>
                Consulta disponibilidad 24/7.
              </p>
            </div>
          </div>
        </div>

        <div className="border-top pt-4 mt-2">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="small footer-link mb-0">
                &copy; {new Date().getFullYear()} <span className="text-dark-blue fw-bold">Casa Narval — Hotel de Playa</span>. Todos los derechos reservados.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <span className="small footer-link">
                Hecho con <i className="bi bi-heart-fill text-danger mx-1"></i> en el Caribe
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
