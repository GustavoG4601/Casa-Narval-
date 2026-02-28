import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AdminContext, { AdminProvider } from './context/AdminContext.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import { useContext } from 'react'

import Home from './pages/Home.jsx'
import Galeria from './pages/Galeria.jsx'
import Precios from './pages/Precios.jsx'
import Servicios from './pages/Servicios.jsx'
import Ubicacion from './pages/Ubicacion.jsx'
import Reseñas from './pages/Resenas.jsx'
import Contacto from './pages/Contacto.jsx'
import Politicas from './pages/Politicas.jsx'

function AppRoutes() {
  const { siteData, loading } = useContext(AdminContext)

  if (loading && !siteData) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-grow text-info mb-3" style={{ width: '3rem', height: '3rem' }} />
          <h5 className="fw-bold text-dark-blue">Cabana Beach</h5>
        </div>
      </div>
    )
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/precios" element={<Precios />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
          <Route path="/resenas" element={<Reseñas />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/politicas" element={<Politicas />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AdminProvider>
      <AppRoutes />
    </AdminProvider>
  )
}
