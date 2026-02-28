export default function Ubicacion() {
  return (
    <main className="py-5 bg-light-soft min-vh-100">
      <div className="container">
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold text-dark-blue">Ubicación & Entorno</h1>
          <p className="text-muted max-w-600 mx-auto">Un refugio exclusivo rodeado de naturaleza, playa y tranquilidad.</p>
        </div>

        <div className="card border-0 shadow-lg rounded-5 overflow-hidden animate-fade-in">
          <div className="ratio ratio-21x9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.689!2d-75.572!3d10.400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTAuNDAwLCA3NS41NzI!5e0!3m2!1ses!2sco!4v1700000000000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de la cabaña"
              className="border-0"
            ></iframe>
          </div>
        </div>

        <div className="row g-4 mt-4 animate-fade-in">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white text-center hover-up transition-all">
              <div className="bg-brand rounded-circle p-3 mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                <i className="bi bi-geo-alt-fill fs-3 text-white" />
              </div>
              <h5 className="fw-bold text-dark-blue">Nuestra Playa</h5>
              <p className="text-muted small m-0">A tan solo 3 minutos caminando (250 metros) por un acceso natural y seguro.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white text-center hover-up transition-all">
              <div className="bg-brand rounded-circle p-3 mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                <i className="bi bi-cup-straw fs-3 text-white" />
              </div>
              <h5 className="fw-bold text-dark-blue">Gastronomía</h5>
              <p className="text-muted small m-0">Restaurantes de comida típica del mar y mini-markets a menos de 5 min en carro.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white text-center hover-up transition-all">
              <div className="bg-brand rounded-circle p-3 mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                <i className="bi bi-airplane-fill fs-3 text-white" />
              </div>
              <h5 className="fw-bold text-dark-blue">Acceso</h5>
              <p className="text-muted small m-0">A 45 minutos del Aeropuerto Internacional. Contamos con transporte privado opcional.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
