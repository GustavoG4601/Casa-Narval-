export default function ReviewCard({ name = 'Invitado', date = '2025-02', text = 'Excelente estadía, volvería sin dudar.', rating = 5 }) {
  return (
    <div className="card border-0 shadow-sm p-4 h-100 rounded-4 bg-white hover-up transition-all">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-info bg-opacity-10 text-brand rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40, fontSize: '0.9rem' }}>
            {name.charAt(0)}
          </div>
          <div>
            <h6 className="m-0 fw-bold text-dark-blue">{name}</h6>
            <span className="small text-muted">{date}</span>
          </div>
        </div>
        <div className="bg-warning bg-opacity-10 text-warning px-2 py-1 rounded-pill small fw-bold">
          ⭐ {Number(rating).toFixed(1)}
        </div>
      </div>
      <p className="small text-muted mb-0 lh-base italic">"{text}"</p>
    </div>
  )
}
