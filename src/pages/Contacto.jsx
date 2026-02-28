
export default function Contacto(){
  return (
    <main className="py-5">
      <div className="container">
        <h1 className="h3">Contacto</h1>
        <p className="text-muted">Déjanos tus datos y te responderemos a la brevedad.</p>
        <div className="row">
          <div className="col-lg-7">
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input className="form-control" placeholder="Tu nombre" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="tu@email.com" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input className="form-control" placeholder="+57 ..." />
              </div>
              <div className="col-md-6">
                <label className="form-label">Fechas</label>
                <input type="text" className="form-control" placeholder="dd/mm/aaaa - dd/mm/aaaa" />
              </div>
              <div className="col-12">
                <label className="form-label">Mensaje</label>
                <textarea className="form-control" rows="4" placeholder="Cuéntanos sobre tu viaje"></textarea>
              </div>
              <div className="col-12">
                <button type="button" className="btn btn-brand rounded-pill">Enviar</button>
              </div>
            </form>
          </div>
          <div className="col-lg-5">
            <div className="card p-3 p-lg-4">
              <h5>También puedes escribirnos</h5>
              <ul className="list-unstyled text-muted">
                <li><i className="bi bi-whatsapp me-2" />WhatsApp: +57 000 000 000</li>
                <li><i className="bi bi-envelope me-2" />Email: hola@cabanaplaya.com</li>
                <li><i className="bi bi-instagram me-2" />Instagram: @cabanaplaya</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
