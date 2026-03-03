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
            ¿Tienes alguna duda o quieres una cotización personalizada? Nuestro equipo te responderá en menos de 24 horas.
          </p>
        </div>

        <div className="row g-lg-5 g-4">
          {/* Contact Form Column */}
          <div className="col-lg-7">
            <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5 animate-slide-up bg-white">
              <h3 className="fw-bold text-dark-blue mb-4">Envíanos un Mensaje</h3>
              <form className="row g-4">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text" className="form-control border-0 bg-light" id="nameInput" placeholder="Nombre completo" />
                    <label htmlFor="nameInput" className="text-muted">Nombre Completo</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="email" className="form-control border-0 bg-light" id="emailInput" placeholder="Correo electrónico" />
                    <label htmlFor="emailInput" className="text-muted">Correo Electrónico</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="tel" className="form-control border-0 bg-light" id="telInput" placeholder="WhatsApp / Teléfono" />
                    <label htmlFor="telInput" className="text-muted">Teléfono / WhatsApp</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text" className="form-control border-0 bg-light" id="subjectInput" placeholder="Nombre completo" />
                    <label htmlFor="subjectInput" className="text-muted">Asunto / Fechas de interés</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea className="form-control border-0 bg-light" id="messageInput" placeholder="Tu mensaje" style={{ height: '150px' }}></textarea>
                    <label htmlFor="messageInput" className="text-muted">Tu mensaje (número de personas, preguntas, etc.)</label>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <button type="button" className="btn btn-brand w-100 py-3 rounded-pill fw-bold shadow-lg text-white">
                    Enviar Mensaje Ahora <i className="bi bi-send-fill ms-2"></i>
                  </button>
                </div>
              </form>
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

