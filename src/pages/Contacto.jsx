import ContactCard from '../components/ContactCard.jsx'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'

export default function Contacto() {
  const { siteData } = useContext(AdminContext)

  return (
    <main className="py-5 bg-light-soft min-vh-100">
      <div className="container py-4">
        {/* Header Section */}
        <div className="text-center mb-5 animate-fade-in">
          <span className="badge-soft px-3 py-2 rounded-pill small fw-bold text-brand mb-3 d-inline-block">
            <i className="bi bi-chat-dots-fill me-2"></i>ESTAMOS PARA AYUDARTE
          </span>
          <h1 className="display-4 fw-bold text-dark-blue mb-3">Contacta con Nosotros</h1>
          <p className="text-muted max-w-600 mx-auto fs-5">
            ¿Tienes alguna duda o quieres una cotización personalizada? Contáctanos por WhatsApp para una respuesta inmediata.
          </p>
        </div>

        <div className="row g-lg-5 g-4">
          {/* Contact WhatsApp Section */}
          <div className="col-lg-7">
            <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5 animate-slide-up bg-white text-center h-100 d-flex flex-column justify-content-center">
              <div className="mb-4">
                <div className="bg-brand-light p-4 rounded-circle d-inline-block mb-3">
                  <i className="bi bi-whatsapp display-4 text-brand"></i>
                </div>
                <h2 className="fw-bold text-dark-blue mb-3">¡Cotiza con Nosotros!</h2>
                <p className="fs-5 text-dark-blue fw-medium mb-4">
                  Cotiza aquí también fiestas, cumpleaños y otros eventos por hora.
                </p>
              </div>
              <div className="mt-3">
                <a
                  href="https://wa.me/573016795104?text=Hola,%20quisiera%20cotizar%20un%20evento."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-brand w-100 py-3 rounded-pill fw-bold shadow-lg text-white fs-5"
                >
                  Contactar por WhatsApp <i className="bi bi-whatsapp ms-2"></i>
                </a>
                <p className="small text-muted mt-3">
                  Haz clic para chatear directamente con nosotros y recibir una cotización inmediata.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="col-lg-5">
            <div className="sticky-top animate-fade-in" style={{ top: '100px' }}>
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-4 bg-white">
                <div className="bg-brand p-4 text-white text-center">
                  <h4 className="fw-bold m-0 text-white">Información Directa</h4>
                  <p className="small m-0 text-white opacity-75">Respuesta inmediata por nuestros canales oficiales</p>
                </div>
                <div className="p-4 p-md-5">
                  <div className="d-flex flex-column gap-4">
                    <ContactCard />
                  </div>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="card shadow-sm border-0 rounded-4 p-4 d-flex flex-row align-items-center gap-3 bg-white">
                <div className="bg-brand-light p-3 rounded-circle text-brand">
                  <i className="bi bi-clock-history fs-4"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1 text-dark-blue">Horario de Atención</h6>
                  <p className="small text-muted m-0">Lunes a Domingo: 8:00 AM — 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

