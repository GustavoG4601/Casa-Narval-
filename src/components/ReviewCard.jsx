
export default function ReviewCard({ name='Invitado', date='2025-02', text='Excelente estadía, volvería sin dudar.', rating=5 }){
  return (
    <div className="card p-3 review-card h-100">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <strong>{name}</strong>
        <span className="rating-pill"><i className="bi bi-star-fill me-1" />{rating.toFixed(2)}</span>
      </div>
      <p className="small text-muted mb-2">{date}</p>
      <p className="mb-0">{text}</p>
    </div>
  )
}
