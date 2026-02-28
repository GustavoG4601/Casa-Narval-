
export default function Ubicacion(){
  return (
    <main className="py-5">
      <div className="container">
        <h1 className="h3">Ubicación</h1>
        <p className="text-muted">Reemplaza el mapa por tu ubicación real de Google Maps.</p>
        <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6891035184107!2d-75.572!3d10.400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTAuNDAwLCA3NS41NzI!5e0!3m2!1ses-419!2sCO!4v1700000000000"
            loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa de la cabaña"></iframe>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-md-4"><div className="card p-3"><strong>Playa</strong><p className="text-muted mb-0">A 3 minutos caminando.</p></div></div>
          <div className="col-md-4"><div className="card p-3"><strong>Restaurantes</strong><p className="text-muted mb-0">Opciones locales a menos de 1 km.</p></div></div>
          <div className="col-md-4"><div className="card p-3"><strong>Aeropuerto</strong><p className="text-muted mb-0">A 45 min en carro.</p></div></div>
        </div>
      </div>
    </main>
  )
}
