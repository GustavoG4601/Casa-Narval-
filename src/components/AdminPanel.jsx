import { useContext, useState, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminPanel() {
  const { isAdmin, login, logout, siteData, saveData, uploadImage, reload } = useContext(AdminContext)
  const [stage, setStage] = useState('login')
  const [activeTab, setActiveTab] = useState('general')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [form, setForm] = useState(null)
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAdmin) setStage('editor')
    else setStage('login')
    if (siteData) setForm(JSON.parse(JSON.stringify(siteData)))
  }, [isAdmin, siteData])

  const handleLogin = async (e) => {
    e.preventDefault()
    const ok = await login(user, pass)
    if (ok) setStage('editor')
    else alert('Credenciales incorrectas')
  }

  const handleChange = (path, value) => {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev || {}))
      const keys = path.split('.')
      let cur = next
      for (let i = 0; i < keys.length - 1; i++) {
        if (!cur[keys[i]]) cur[keys[i]] = {}
        cur = cur[keys[i]]
      }
      cur[keys[keys.length - 1]] = value
      return next
    })
  }

  const handleImage = async (e, path) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const res = await uploadImage(file)
    setUploading(false)
    if (res?.ok && res.path) {
      handleChange(path, res.path)
    } else {
      alert('Error subiendo imagen')
    }
  }

  const handleAddGalleryImage = async (e, sessionId) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const res = await uploadImage(file)
    setUploading(false)
    if (res?.ok && res.path) {
      const nextForm = { ...form }
      const session = nextForm.sessions.find(s => s.id === sessionId)
      if (session) {
        session.images.push({ src: res.path, title: 'Nueva foto' })
        setForm(nextForm)
      }
    }
  }

  const removeGalleryImage = (sessionId, index) => {
    const nextForm = { ...form }
    const session = nextForm.sessions.find(s => s.id === sessionId)
    if (session) {
      session.images.splice(index, 1)
      setForm(nextForm)
    }
  }

  const handleSave = async () => {
    const ok = await saveData(form)
    if (ok) {
      alert('Cambios guardados con éxito')
      reload()
    } else alert('Error al guardar')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Amenities Handlers
  const addAmenity = (type) => {
    const nextForm = JSON.parse(JSON.stringify(form))
    const newItem = { icon: 'star', title: 'Nuevo Servicio', text: 'Descripción breve' }
    if (!nextForm[type]) nextForm[type] = []
    nextForm[type].push(newItem)
    setForm(nextForm)
  }

  const removeAmenity = (type, index) => {
    const nextForm = JSON.parse(JSON.stringify(form))
    if (nextForm[type]) {
      nextForm[type].splice(index, 1)
      setForm(nextForm)
    }
  }

  const handleAddSession = () => {
    const nextForm = JSON.parse(JSON.stringify(form))
    const id = `sesion-${Date.now()}`
    nextForm.sessions.push({
      id,
      title: 'Nueva Sesión',
      mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?im_w=1440',
      images: []
    })
    setForm(nextForm)
  }

  const removeSession = (id) => {
    if (!confirm('¿Seguro que quieres borrar toda esta sesión?')) return
    const nextForm = JSON.parse(JSON.stringify(form))
    nextForm.sessions = nextForm.sessions.filter(s => s.id !== id)
    setForm(nextForm)
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container" style={{ maxWidth: '1000px' }}>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 p-4 bg-white rounded-4 shadow-sm">
          <div>
            <h2 className="m-0 fw-bold h4">Panel de Control</h2>
            <p className="small text-muted m-0">Gestiona el contenido de tu sitio web</p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/" className="btn btn-outline-secondary px-3 rounded-pill">Volver al Sitio</Link>
            {isAdmin && <button onClick={handleLogout} className="btn btn-danger px-3 rounded-pill">Cerrar Sesión</button>}
          </div>
        </div>

        {stage === 'login' ? (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ maxWidth: '400px', margin: '3rem auto' }}>
            <div className="card-body p-5">
              <h4 className="text-center fw-bold mb-4">Administrador</h4>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Usuario</label>
                  <input className="form-control bg-light border-0 py-2" value={user} onChange={e => setUser(e.target.value)} placeholder="admin" required />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold">Contraseña</label>
                  <input type="password" className="form-control bg-light border-0 py-2" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" required />
                </div>
                <button type="submit" className="btn btn-brand w-100 text-white fw-bold py-2 rounded-3">Entrar al Panel</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {/* Nav */}
            <div className="col-md-3">
              <div className="bg-white p-3 rounded-4 shadow-sm sticky-top" style={{ top: '20px' }}>
                <div
                  className={`p-3 rounded-3 mb-2 cursor-pointer transition-all ${activeTab === 'general' ? 'bg-info bg-opacity-10 text-brand fw-bold shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveTab('general')}
                >
                  <i className="bi bi-gear-fill me-2" /> General
                </div>
                <div
                  className={`p-3 rounded-3 mb-2 cursor-pointer transition-all ${activeTab === 'gallery' ? 'bg-info bg-opacity-10 text-brand fw-bold shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveTab('gallery')}
                >
                  <i className="bi bi-images me-2" /> Galería
                </div>
                <div
                  className={`p-3 rounded-3 mb-2 cursor-pointer transition-all ${activeTab === 'services' ? 'bg-info bg-opacity-10 text-brand fw-bold shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveTab('services')}
                >
                  <i className="bi bi-list-check me-2" /> Servicios
                </div>
                <div
                  className={`p-3 rounded-3 cursor-pointer transition-all ${activeTab === 'prices' ? 'bg-info bg-opacity-10 text-brand fw-bold shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveTab('prices')}
                >
                  <i className="bi bi-tag-fill me-2" /> Precios
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="col-md-9">
              <div className="bg-white p-4 rounded-4 shadow-sm min-vh-50">
                {form ? (
                  <>
                    {activeTab === 'general' && (
                      <div className="animate-fade-in">
                        <h5 className="fw-bold mb-4 border-bottom pb-2">Configuración General</h5>
                        <div className="mb-4">
                          <label className="form-label small fw-bold">Título del Hero</label>
                          <input className="form-control" value={form.hero?.title || ''} onChange={e => handleChange('hero.title', e.target.value)} />
                        </div>
                        <div className="mb-4">
                          <label className="form-label small fw-bold">Subtítulo del Hero</label>
                          <textarea className="form-control" rows={3} value={form.hero?.subtitle || ''} onChange={e => handleChange('hero.subtitle', e.target.value)} />
                        </div>
                        <div className="mb-4">
                          <label className="form-label small fw-bold">Imagen Home Destacada</label>
                          <div className="d-flex gap-3 align-items-end">
                            <img src={form.home?.featureImage} className="rounded-3 shadow-sm" style={{ width: 120, height: 80, objectFit: 'cover' }} />
                            <input type="file" className="form-control" onChange={e => handleImage(e, 'home.featureImage')} />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'gallery' && (
                      <div className="animate-fade-in">
                        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-4">
                          <div>
                            <h5 className="fw-bold m-0 text-dark-blue">Gestión de Galería</h5>
                            <p className="small text-muted m-0">Administra las sesiones y fotos que se muestran en el sitio.</p>
                          </div>
                          <button className="btn btn-brand text-white rounded-pill px-4 shadow-sm" onClick={handleAddSession}>
                            <i className="bi bi-folder-plus me-2" />Nueva Sesión
                          </button>
                        </div>

                        {form.sessions?.length > 0 ? (
                          form.sessions.map((session, sIdx) => (
                            <div key={session.id} className="mb-5 p-4 border-0 shadow-sm rounded-4 bg-white position-relative hover-up transition-all border border-transparent hover-border-info">
                              <button onClick={() => removeSession(session.id)} className="btn btn-sm btn-outline-danger border-0 position-absolute top-0 end-0 m-3 rounded-circle">
                                <i className="bi bi-trash3 fs-5" />
                              </button>

                              <div className="row g-4 mb-4 mt-2">
                                <div className="col-lg-6">
                                  <label className="small fw-bold text-muted mb-2">Nombre de la Sesión</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light border-0"><i className="bi bi-tag" /></span>
                                    <input className="form-control bg-light border-0 py-2" value={session.title} onChange={e => handleChange(`sessions.${sIdx}.title`, e.target.value)} placeholder="Ej: Atardeceres, Habitaciones..." />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <label className="small fw-bold text-muted mb-2">Imagen de Portada (Miniatura)</label>
                                  <div className="d-flex gap-3 align-items-center">
                                    <img src={session.mainImage} className="rounded-3 shadow-sm border" style={{ width: 80, height: 50, objectFit: 'cover' }} alt="portada" />
                                    <div className="flex-grow-1 position-relative">
                                      <button className="btn btn-sm btn-outline-info w-100 rounded-2 py-2">{uploading ? 'Cargando...' : 'Cambiar Portada'}</button>
                                      <input type="file" className="position-absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleImage(e, `sessions.${sIdx}.mainImage`)} />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 pt-4 border-top">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <h6 className="m-0 fw-bold text-muted"><i className="bi bi-images me-2" />Fotos en esta sesión ({session.images.length})</h6>
                                  <div className="position-relative">
                                    <button className="btn btn-sm btn-info text-white rounded-pill px-4 shadow-sm">{uploading ? 'Subiendo...' : '+ Añadir Fotos'}</button>
                                    <input type="file" className="position-absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleAddGalleryImage(e, session.id)} disabled={uploading} />
                                  </div>
                                </div>
                                <div className="gallery-admin-grid">
                                  {session.images.map((img, idx) => (
                                    <div key={idx} className="gallery-admin-item shadow-sm">
                                      <img src={img.src} className="rounded-3" alt={`img-${idx}`} />
                                      <button onClick={() => removeGalleryImage(session.id, idx)} className="gallery-admin-delete shadow-lg">✕</button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-5 bg-light rounded-4">
                            <i className="bi bi-images fs-1 text-muted opacity-25 d-block mb-3" />
                            <p className="text-muted">No has creado ninguna sesión todavía.</p>
                            <button className="btn btn-brand text-white rounded-pill px-4 mt-2" onClick={handleAddSession}>Empezar ahora</button>
                          </div>
                        )}
                      </div>
                    )}


                    {activeTab === 'services' && (
                      <div className="animate-fade-in">
                        <h5 className="fw-bold mb-4 border-bottom pb-2 text-dark-blue">Gestión de Servicios</h5>

                        {/* Disponibles */}
                        <div className="mb-4">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold m-0 text-success">Disponibles</h6>
                            <button className="btn btn-sm btn-outline-success rounded-pill" onClick={() => addAmenity('available')}>+ Añadir</button>
                          </div>
                          {form.available?.map((item, i) => (
                            <div key={i} className="card p-3 mb-2 border-0 bg-light rounded-3 position-relative">
                              <div className="row g-2 pe-4">
                                <div className="col-md-3">
                                  <label className="small fw-bold">Icono (BI)</label>
                                  <input className="form-control form-control-sm" value={item.icon} onChange={e => handleChange(`available.${i}.icon`, e.target.value)} />
                                </div>
                                <div className="col-md-4">
                                  <label className="small fw-bold">Título</label>
                                  <input className="form-control form-control-sm" value={item.title} onChange={e => handleChange(`available.${i}.title`, e.target.value)} />
                                </div>
                                <div className="col-md-5">
                                  <label className="small fw-bold">Descripción</label>
                                  <input className="form-control form-control-sm" value={item.text} onChange={e => handleChange(`available.${i}.text`, e.target.value)} />
                                </div>
                              </div>
                              <button onClick={() => removeAmenity('available', i)} className="btn btn-sm text-danger position-absolute top-0 end-0 p-2">✕</button>
                            </div>
                          ))}
                        </div>

                        {/* No Disponibles */}
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold m-0 text-danger">No Disponibles</h6>
                            <button className="btn btn-sm btn-outline-danger rounded-pill" onClick={() => addAmenity('notAvailable')}>+ Añadir</button>
                          </div>
                          {form.notAvailable?.map((item, i) => (
                            <div key={i} className="card p-3 mb-2 border-0 bg-light rounded-3 position-relative">
                              <div className="row g-2 pe-4">
                                <div className="col-md-4">
                                  <label className="small fw-bold">Título</label>
                                  <input className="form-control form-control-sm" value={item.title} onChange={e => handleChange(`notAvailable.${i}.title`, e.target.value)} />
                                </div>
                                <div className="col-md-8">
                                  <label className="small fw-bold">Descripción</label>
                                  <input className="form-control form-control-sm" value={item.text} onChange={e => handleChange(`notAvailable.${i}.text`, e.target.value)} />
                                </div>
                              </div>
                              <button onClick={() => removeAmenity('notAvailable', i)} className="btn btn-sm text-danger position-absolute top-0 end-0 p-2">✕</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'prices' && (
                      <div className="animate-fade-in">
                        <h5 className="fw-bold mb-4 border-bottom pb-2">Disponibilidad & Precios</h5>
                        {form.plans?.map((plan, i) => (
                          <div key={i} className="card p-3 mb-3 border-0 bg-light rounded-4">
                            <div className="row g-3">
                              <div className="col-md-6">
                                <label className="form-label small fw-bold">Nombre</label>
                                <input className="form-control bg-white" value={plan.name} onChange={e => handleChange(`plans.${i}.name`, e.target.value)} />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label small fw-bold">Precio ($)</label>
                                <input type="number" className="form-control bg-white" value={plan.price} onChange={e => handleChange(`plans.${i}.price`, Number(e.target.value))} />
                              </div>
                              <div className="col-12">
                                <label className="form-label small fw-bold">Descripción Corta</label>
                                <input className="form-control bg-white" value={plan.desc} onChange={e => handleChange(`plans.${i}.desc`, e.target.value)} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 pt-4 border-top d-flex justify-content-end gap-2">
                      <button onClick={handleSave} className="btn btn-brand px-5 py-2 text-white fw-bold rounded-pill shadow-sm" disabled={uploading}>
                        {uploading ? 'Procesando...' : 'Guardar Todos los Cambios'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" />
                    <p className="mt-2 text-muted">Cargando...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
