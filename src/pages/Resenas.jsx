import { useState } from "react";
import ReviewCard from "../components/ReviewCard.jsx";

const sample = [
  { name: "Carolina", date: "2025-05", text: "La cabaña es espectacular, súper limpia y con una vista soñada.", rating: 5.0 },
  { name: "Daniel", date: "2025-03", text: "Anfitriones atentos. A 3 min de la playa. Volveré.", rating: 4.5 },
  { name: "Laura", date: "2025-02", text: "Todo tal cual las fotos. La terraza es lo mejor.", rating: 5.0 },
  { name: "Sofía", date: "2025-01", text: "Camas cómodas y Wi-Fi rápido, perfecto para teletrabajo.", rating: 4.8 },
];

export default function Resenas() {
  const [reviews, setReviews] = useState(sample);
  const [form, setForm] = useState({ name: "", text: "", rating: 5 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.text) return;

    const newReview = {
      name: form.name,
      date: new Date().toISOString().slice(0, 7),
      text: form.text,
      rating: parseFloat(form.rating),
    };

    setReviews([newReview, ...reviews]);
    setForm({ name: "", text: "", rating: 5 });
  };

  const avg = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <main className="py-5 bg-light-soft min-vh-100">
      <div className="container">

        {/* Encabezado */}
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold text-dark-blue">Experiencias de Huéspedes</h1>
          <p className="text-muted max-w-600 mx-auto">Lo que dicen quienes ya disfrutaron de la brisa y el mar en nuestra cabaña.</p>

          <div className="d-inline-flex align-items-center gap-3 bg-white px-4 py-2 rounded-pill shadow-sm mt-3">
            <div className="text-warning fs-4 fw-bold">⭐ {avg}</div>
            <div className="vr"></div>
            <div className="text-muted small fw-medium">{reviews.length} opiniones totales</div>
          </div>
        </div>

        <div className="row g-5">
          {/* Listado */}
          <div className="col-lg-8 order-2 order-lg-1">
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

          {/* Formulario Lateral */}
          <div className="col-lg-4 order-1 order-lg-2">
            <div className="sticky-top" style={{ top: '100px' }}>
              <div className="card border-0 shadow-sm rounded-4 p-4 animate-fade-in">
                <h5 className="fw-bold mb-3 text-dark-blue">¿Te hospedaste con nosotros?</h5>
                <p className="small text-muted mb-4">Tu opinión es muy valiosa para nosotros y para futuros viajeros.</p>

                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-bold">Tu Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control bg-light border-0 px-3 py-2"
                      placeholder="Ej: Juan Pérez"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Calificación</label>
                    <select
                      name="rating"
                      value={form.rating}
                      onChange={handleChange}
                      className="form-select bg-light border-0 px-3 py-2"
                    >
                      <option value="5">Excelente ⭐⭐⭐⭐⭐</option>
                      <option value="4">Muy bueno ⭐⭐⭐⭐</option>
                      <option value="3">Bueno ⭐⭐⭐</option>
                      <option value="2">Regular ⭐⭐</option>
                      <option value="1">Malo ⭐</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Comentario</label>
                    <textarea
                      name="text"
                      value={form.text}
                      onChange={handleChange}
                      className="form-control bg-light border-0 px-3 py-2"
                      rows="4"
                      placeholder="¿Qué fue lo que más te gustó?"
                      required
                    />
                  </div>
                  <div className="col-12 pt-2">
                    <button type="submit" className="btn btn-brand w-100 text-white fw-bold py-2 rounded-3 shadow-sm">
                      Publicar mi Reseña
                    </button>
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
