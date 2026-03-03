export default function ReviewCard({
  name = 'Invitado',
  date = '2025-02',
  text = 'Excelente estadía, volvería sin dudar.',
  rating = 5,
  platform = 'Sitio Web'
}) {
  const getPlatformIcon = () => {
    switch (platform.toLowerCase()) {
      case 'airbnb': return <i className="bi bi-house-door-fill text-danger me-1"></i>;
      case 'google': return <i className="bi bi-google text-primary me-1"></i>;
      case 'booking': return <i className="bi bi-calendar-check-fill text-info me-1"></i>;
      default: return <i className="bi bi-globe text-brand me-1"></i>;
    }
  }

  return (
    <div className="card border-0 shadow-lg p-4 h-100 rounded-4 bg-white hover-up transition-all border-bottom border-4 border-brand-light">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-brand-light text-brand rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: 48, height: 48, fontSize: '1.1rem' }}>
            {name.charAt(0)}
          </div>
          <div>
            <h6 className="m-0 fw-bold text-dark-blue d-flex align-items-center gap-2">
              {name}
              <i className="bi bi-patch-check-fill text-info" title="Huésped verificado" style={{ fontSize: '0.9rem' }}></i>
            </h6>
            <div className="d-flex align-items-center gap-2 mt-1">
              <span className="badge bg-light text-muted border py-1 px-2 rounded-pill" style={{ fontSize: '0.65rem' }}>
                {getPlatformIcon()} {platform}
              </span>
              <span className="small text-muted opacity-75" style={{ fontSize: '0.75rem' }}>• {date}</span>
            </div>
          </div>
        </div>
        <div className="text-warning d-flex gap-1" style={{ fontSize: '0.8rem' }}>
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'}`}></i>
          ))}
        </div>
      </div>
      <p className="text-dark-blue mb-0 lh-base" style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>
        <i className="bi bi-quote fs-4 text-brand opacity-25 me-1"></i>
        {text}
      </p>
    </div>
  )
}
