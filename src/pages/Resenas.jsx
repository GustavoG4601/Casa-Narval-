import { useState, useEffect } from "react";
import ReviewCard from "../components/ReviewCard.jsx";

const sample = [
  { name: "Carolina", date: "2024-11", text: "La cabaña es espectacular, súper limpia y con una vista soñada. El diseño moderno la hace única en la zona.", rating: 5, platform: "Airbnb" },
  { name: "Daniel", date: "2024-12", text: "Anfitriones muy atentos. La ubicación es perfecta, a solo 3 min caminando de la playa. Volveré sin duda.", rating: 5, platform: "Google" },
  { name: "Laura", date: "2025-01", text: "Todo tal cual las fotos. La terraza es el mejor lugar para ver el atardecer. Muy recomendado para parejas.", rating: 5, platform: "Booking" },
  { name: "Carlos M.", date: "2025-02", text: "Excelente Wi-Fi para trabajar mientras disfrutas del mar. Las camas son muy cómodas y el Aire Acondicionado funciona de maravilla.", rating: 5, platform: "Sitio Web" },
];

export default function Resenas() {
  const [reviews, setReviews] = useState(sample);
  const [form, setForm] = useState({ name: "", text: "", rating: 5 });
  const [loading, setLoading] = useState(true);

  const platforms = [
    { name: 'Airbnb', icon: 'bi-house-door-fill', color: '#FF385C', link: 'https://airbnb.com' },
    { name: 'Google', icon: 'bi-google', color: '#4285F4', link: 'https://google.com' },
    { name: 'Booking', icon: 'bi-calendar-check-fill', color: '#003580', link: 'https://booking.com' },
  ]

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando reseñas:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.text) return;

    const newReview = {
      name: form.name,
      date: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
      text: form.text,
      rating: parseInt(form.rating),
      platform: "Sitio Web" // Reseñas directas
    };

    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setReviews([newReview, ...reviews]);
          setForm({ name: "", text: "", rating: 5 });
        }
      })
      .catch(err => console.error('Error guardando reseña:', err));
  };

  const avg = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <main className="py-5 bg-light-soft min-vh-100">
      <div className="container py-4">

        {/* Header Section */}
        <div className="text-center mb-5 animate-fade-in">
          <span className="badge-soft px-3 py-2 rounded-pill small fw-bold text-brand mb-3 d-inline-block">
            <i className="bi bi-star-fill me-2"></i>OPINIONES VERIFICADAS
          </span>
          <h1 className="display-4 fw-bold text-dark-blue mb-3">Tu Experiencia es Nuestra Prioridad</h1>
          <p className="text-muted max-w-700 mx-auto fs-5">
            Descubre por qué nuestros huéspedes aman Casa Narval. Opiniones reales de viajeros que ya disfrutaron del paraíso.
          </p>

          <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 mt-5">
            <div className="bg-white px-5 py-4 rounded-4 shadow-lg border-bottom border-4 border-brand text-center">
              <div className="display-4 fw-bold text-dark-blue mb-0">{avg}</div>
              <div className="text-warning mb-2" style={{ letterSpacing: '4px' }}>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <div className="small text-muted fw-bold text-uppercase tracking-wider">Puntuación Media</div>
            </div>

            <div className="d-flex flex-column gap-3 py-2">
              <h6 className="fw-bold text-muted text-uppercase small text-center text-md-start mb-0">También búscanos en:</h6>
              <div className="d-flex gap-3">
                {platforms.map((p, i) => (
                  <a key={i} href={p.link} target="_blank" rel="noreferrer"
                    className="btn bg-white border shadow-sm rounded-4 px-3 py-2 d-flex align-items-center gap-2 hover-up transition-all text-decoration-none">
                    <i className={`bi ${p.icon}`} style={{ color: p.color, fontSize: '1.2rem' }}></i>
                    <span className="small fw-bold text-dark-blue">{p.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row g-5 mt-4">
          {/* Reviews List */}
          <div className="col-lg-8 order-2 order-lg-1">
            <h3 className="fw-bold text-dark-blue mb-4 d-flex align-items-center gap-3">
              Historias Recientes
              <div className="badge bg-brand-light text-brand small rounded-pill fs-6">{reviews.length} opiniones</div>
            </h3>
            <div className="row g-4">
              {reviews.map((r, i) => (
                <div className="col-md-6" key={i}>
                  <div className="h-100 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                    <ReviewCard {...r} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Form */}
          <div className="col-lg-4 order-1 order-lg-2">
            <div className="sticky-top" style={{ top: '100px' }}>
              <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 animate-fade-in bg-white overflow-hidden">
                <div className="bg-brand p-1 position-absolute top-0 start-0 end-0"></div>
                <h5 className="fw-bold mb-3 text-dark-blue">Cuéntanos tu Experiencia</h5>
                <p className="small text-muted mb-4">¿Te hospedaste en Casa Narval? Tu opinión ayuda a otros viajeros a elegir su próximo refugio.</p>

                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-12">
                    <div className="form-floating mb-1">
                      <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control border-0 bg-light" id="revName" placeholder="Juan" required />
                      <label htmlFor="revName" className="text-muted small">Tu Nombre</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold text-muted mb-1 ps-1">¿Cómo fue tu estadía?</label>
                    <select name="rating" value={form.rating} onChange={handleChange} className="form-select border-0 bg-light py-3 rounded-3 shadow-none">
                      <option value="5">Excelente ⭐⭐⭐⭐⭐</option>
                      <option value="4">Muy bueno ⭐⭐⭐⭐</option>
                      <option value="3">Bueno ⭐⭐⭐</option>
                      <option value="2">Regular ⭐⭐</option>
                      <option value="1">Malo ⭐</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <div className="form-floating mb-3">
                      <textarea name="text" value={form.text} onChange={handleChange} className="form-control border-0 bg-light" id="revText" placeholder="Comentario" style={{ height: '120px' }} required />
                      <label htmlFor="revText" className="text-muted small">Tu Comentario</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-brand w-100 text-white fw-bold py-3 rounded-pill shadow-lg transition-all">
                      Publicar mi Reseña <i className="bi bi-check-circle ms-2"></i>
                    </button>
                    <p className="text-center small text-muted mt-3 mb-0" style={{ fontSize: '0.7rem' }}>
                      <i className="bi bi-shield-check me-1"></i> Publicación 100% segura y moderada.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
