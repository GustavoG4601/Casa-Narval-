
import AmenitiesGrid from '../components/AmenitiesGrid.jsx'

export default function Servicios(){
  return (
    <main className="py-5">
      <div className="container">
        <h1 className="h3">Servicios & Amenidades</h1>
        <p className="text-muted">Personaliza esta lista según tu propiedad.</p>
        <AmenitiesGrid />
      </div>
    </main>
  )
}
