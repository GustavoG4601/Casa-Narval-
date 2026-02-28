import AmenitiesGrid from '../components/AmenitiesGrid.jsx'

export default function Servicios() {
  return (
    <main className="py-5 bg-light-soft min-vh-100">
      <div className="container">
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold text-dark-blue">Servicios & Confort</h1>
          <p className="text-muted max-w-600 mx-auto">Todo lo que necesitas para una estancia inolvidable frente al mar.</p>
        </div>

        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white animate-fade-in shadow-lg">
          <AmenitiesGrid />
        </div>
      </div>
    </main>
  )
}
