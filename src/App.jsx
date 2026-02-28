
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Galeria from './pages/Galeria.jsx'
import Precios from './pages/Precios.jsx'
import Servicios from './pages/Servicios.jsx'
import Ubicacion from './pages/Ubicacion.jsx'
import Reseñas from './pages/Resenas.jsx'
import Contacto from './pages/Contacto.jsx'
import Politicas from './pages/Politicas.jsx'

export default function App(){
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/precios" element={<Precios />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/resenas" element={<Reseñas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/politicas" element={<Politicas />} />
      </Routes>
      <Footer />
    </div>
  )
}
