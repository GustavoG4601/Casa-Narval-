import { useState } from "react";
import ReviewCard from "../components/ReviewCard.jsx";

const sample = [
  { name: "Carolina", date: "2025-05", text: "La cabaña es espectacular, súper limpia y con una vista soñada.", rating: 4.0 },
  { name: "Daniel", date: "2025-03", text: "Anfitriones atentos. A 3 min de la playa. Volveré.", rating: 4.0 },
  { name: "Laura", date: "2025-02", text: "Todo tal cual las fotos. La terraza es lo mejor.", rating: 5.0 },
  { name: "Sofía", date: "2025-01", text: "Camas cómodas y Wi-Fi rápido, perfecto para teletrabajo.", rating: 5.0 },
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
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(2)
    : 0;

  return (
    <main className="py-5">
      <div className="container">

        {/* Encabezado */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
          <h1 className="h3 m-0">Reseñas</h1>

          <div className="mt-2 mt-md-0 text-md-end">
            <span className="fw-semibold fs-5 text-warning">⭐ {avg}</span>
            <span className="text-muted ms-2">({reviews.length} reseñas)</span>
          </div>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="mb-5 p-4 border rounded-4 shadow-sm bg-white"
        >
          <h5 className="mb-3 fw-semibold">Déjanos tu reseña</h5>

          <div className="row g-3">

            <div className="col-md-6">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control form-control-lg"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="col-md-6">
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="form-select form-select-lg"
              >
                <option value="5">⭐ 5 - Excelente</option>
                <option value="4">⭐ 4 - Muy bueno</option>
                <option value="3">⭐ 3 - Aceptable</option>
                <option value="2">⭐ 2 - Regular</option>
                <option value="1">⭐ 1 - Malo</option>
              </select>
            </div>

            <div className="col-12">
              <textarea
                name="text"
                value={form.text}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Escribe tu reseña aquí..."
                required
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 py-2 shadow-sm"
              >
                Enviar reseña
              </button>
            </div>

          </div>
        </form>

        {/* Lista de reseñas */}
        <div className="row g-4">
          {reviews.map((r, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="h-100 animate__animated animate__fadeInUp animate__faster">
                <ReviewCard {...r} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
