
import data from '../data/precios.json'

export default function Precios(){
  return (
    <main className="py-5">
      <div className="container">
        <h1 className="h3">Disponibilidad & Precios</h1>
        <p className="text-muted">Ajústalo según temporada. Puedes conectar un motor de reservas más adelante.</p>

        <div className="row g-3">
          {data.plans.map((p, i) => (
            <div className="col-md-4" key={i}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="text-muted">{p.desc}</p>
                  <h3 className="fw-bold">${"{"}p.price{"}"} <small className="fs-6 text-muted">/ noche</small></h3>
                  <ul className="mt-3">
                    {p.includes.map((x, idx) => <li key={idx}>{x}</li>)}
                  </ul>
                </div>
                <div className="card-footer bg-white border-0">
                  <button className="btn btn-brand w-100 rounded-pill">Reservar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
