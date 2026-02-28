import { useState } from "react";

export default function AmenitiesGrid() {
  const [showAllAvailable, setShowAllAvailable] = useState(false)
  const [showAllNotAvailable, setShowAllNotAvailable] = useState(false)

  const available = [
    { icon: 'wifi', title: 'Wi-Fi de alta velocidad', text: 'Trabaja o disfruta de streaming sin cortes.' },
    { icon: 'wind', title: 'Aire acondicionado', text: 'Clima perfecto todo el año.' },
    { icon: 'sun', title: 'Terraza con vista', text: 'Atardeceres increíbles frente al mar.' },
    { icon: 'cup-hot', title: 'Cocina equipada', text: 'Cafetera, licuadora, congelador y vajilla completa.' },
    { icon: 'droplet', title: 'Piscina y jacuzzi', text: 'Relájate en espacios de agua privada.' },
    { icon: 'car-front', title: 'Parqueadero gratuito', text: 'Privado y seguro, disponible 24/7.' },
    { icon: 'tv', title: 'TV', text: 'Pantalla plana con señal local.' },
    { icon: 'fire', title: 'Zona de fogata', text: 'Ambiente acogedor para las noches frescas.' },
    { icon: 'umbrella', title: 'Acceso a playa', text: 'Salida directa a playa privada.' },
    { icon: 'shield-lock', title: 'Seguridad', text: 'Cámaras exteriores, botiquín y extintor.' },
    { icon: 'house-heart', title: 'Espacios familiares', text: 'Ideal para grupos grandes o familias.' },
    { icon: 'person-workspace', title: 'Zona de trabajo', text: 'Espacio tranquilo con buena conexión.' },
    { icon: 'tree', title: 'Hamaca y exterior', text: 'Relájate en hamaca, zona BBQ y terraza.' },
    { icon: 'dumbbell', title: 'Ejercicio', text: 'Equipo básico para entrenar.' },
  ]

  const notAvailable = [
    { icon: 'exclamation-triangle', title: 'Detector de humo', text: 'Este espacio no cuenta con detector de humo.' },
    { icon: 'exclamation-triangle', title: 'Detector de monóxido', text: 'No tiene detector de monóxido de carbono.' },
    { icon: 'slash-circle', title: 'Secadora', text: 'Este espacio no ofrece secadora de ropa.' },
    { icon: 'thermometer', title: 'Calefacción', text: 'No incluye sistema de calefacción.' },
    { icon: 'droplet-half', title: 'Agua caliente', text: 'No dispone de agua caliente.' },
    { icon: 'tools', title: 'Servicios imprescindibles', text: 'Algunos servicios básicos no están disponibles.' },
  ]

  return (
    <div>
      {/* Servicios disponibles */}
      <h5 className="fw-semibold mb-3">Servicios destacados</h5>
      <div className="grid-amenities mb-3">
        {(showAllAvailable ? available : available.slice(0, 4)).map((it, idx) => (
          <div className="card p-3" key={idx}>
            <div className="d-flex align-items-start gap-3">
              <i className={`bi bi-${it.icon} fs-3 text-primary`} />
              <div>
                <h6 className="mb-1">{it.title}</h6>
                <p className="text-muted mb-0">{it.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {available.length > 4 && (
        <button
          className="btn btn-outline-primary btn-sm mb-4"
          onClick={() => setShowAllAvailable(!showAllAvailable)}
        >
          {showAllAvailable ? "Ver menos" : "Ver más"}
        </button>
      )}

      {/* Servicios no disponibles */}
      <h5 className="fw-semibold mb-3">No disponibles</h5>
      <div className="grid-amenities mb-3">
        {(showAllNotAvailable ? notAvailable : notAvailable.slice(0, 4)).map((it, idx) => (
          <div className="card p-3 bg-light" key={idx}>
            <div className="d-flex align-items-start gap-3">
              <i className={`bi bi-${it.icon} fs-3 text-danger`} />
              <div>
                <h6 className="mb-1">{it.title}</h6>
                <p className="text-muted mb-0">{it.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {notAvailable.length > 4 && (
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setShowAllNotAvailable(!showAllNotAvailable)}
        >
          {showAllNotAvailable ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  )
}
