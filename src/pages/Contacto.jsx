
export default function Contacto() {
  return (
    <main className="py-5 bg-light-soft min-vh-100">
      <div className="container">
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold text-dark-blue">Contacta con Nosotros</h1>
          <p className="text-muted max-w-600 mx-auto">¿Tienes alguna duda o quieres una cotización personalizada? Estamos para ayudarte.</p>
        </div>

        <div className="row g-5">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 animate-fade-in">
              <form className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Nombre Completo</label>
                  <input className="form-control bg-light border-0 py-3 px-4 rounded-3" placeholder="Tu nombre" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Correo Electrónico</label>
                  <input type="email" className="form-control bg-light border-0 py-3 px-4 rounded-3" placeholder="tu@email.com" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Teléfono / WhatsApp</label>
                  <input className="form-control bg-light border-0 py-3 px-4 rounded-3" placeholder="+57 ..." />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Fechas de Interés</label>
                  <input type="text" className="form-control bg-light border-0 py-3 px-4 rounded-3" placeholder="Ej: Semana Santa" />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold small">Tu Mensaje</label>
                  <textarea className="form-control bg-light border-0 py-3 px-4 rounded-3" rows="5" placeholder="Cuéntanos sobre tu viaje, número de personas, etc."></textarea>
                </div>
                <div className="col-12 text-end">
                  <button type="button" className="btn btn-brand text-white fw-bold px-5 py-3 rounded-pill shadow-sm">
                    Enviar Mensaje <i className="bi bi-send ms-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="sticky-top" style={{ top: '100px' }}>
              <div className="card border-0 bg-dark-blue text-white p-4 p-md-5 rounded-4 shadow-lg mb-4 animate-fade-in">
                <h4 className="fw-bold mb-4">Información de Contacto</h4>
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex align-items-center gap-4">
                    <div className="bg-brand rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                      <i className="bi bi-whatsapp fs-4" />
                    </div>
                    <div>
                      <p className="small text-white-50 m-0">Escríbenos por WhatsApp</p>
                      <h6 className="m-0 fw-bold">+57 300 680 6697</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    <div className="bg-brand rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                      <i className="bi bi-envelope fs-4" />
                    </div>
                    <div>
                      <p className="small text-white-50 m-0">Envíanos un correo</p>
                      <h6 className="m-0 fw-bold">hola@cabanaplaya.com</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    <div className="bg-brand rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                      <i className="bi bi-instagram fs-4" />
                    </div>
                    <div>
                      <p className="small text-white-50 m-0">Síguenos en redes</p>
                      <h6 className="m-0 fw-bold">@cabanaplaya_oficial</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm p-4 rounded-4 bg-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h6 className="fw-bold mb-2">Horario de Atención</h6>
                <p className="small text-muted m-0">Lunes a Domingo: 8:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

