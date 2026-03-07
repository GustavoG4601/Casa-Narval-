import { useContext, useState, useEffect, useRef } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useToast, ToastContainer } from './Toast.jsx'
import { compressImage } from '../utils/imageUtils'
import ImageWithSkeleton from './ImageWithSkeleton'

export default function AdminPanel() {
  const { isAdmin, login, logout, siteData, saveData, uploadImage, reload, changePassword } = useContext(AdminContext)
  const [stage, setStage] = useState('login')
  const [activeTab, setActiveTab] = useState('general')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [form, setForm] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [passForm, setPassForm] = useState({ oldPass: '', newPass: '', confirmPass: '' })
  const navigate = useNavigate()
  const { toasts, showToast, removeToast } = useToast()
  const fileInputRefs = useRef({})
  const galleryFileRefs = useRef({})

  useEffect(() => {
    if (isAdmin) setStage('editor')
    else setStage('login')
    if (siteData) setForm(JSON.parse(JSON.stringify(siteData)))
  }, [isAdmin, siteData])

  const handleLogin = async (e) => {
    e.preventDefault()
    const ok = await login(user, pass)
    if (ok) setStage('editor')
    else showToast('Usuario o contraseña incorrectos', 'error')
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
    try {
      const compressedFile = await compressImage(file)
      const res = await uploadImage(compressedFile)
      if (res?.ok && res.path) {
        handleChange(path, res.path)
        showToast('Imagen subida y optimizada correctamente', 'success')
      } else {
        showToast('Error al subir la imagen. Intenta de nuevo', 'error')
      }
    } catch (err) {
      console.error("Compression error:", err)
      showToast('Error al procesar la imagen', 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleAddGalleryImage = async (e, sessionId) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const compressedFile = await compressImage(file)
      const res = await uploadImage(compressedFile)
      if (res?.ok && res.path) {
        const nextForm = { ...form }
        const session = nextForm.sessions.find(s => s.id === sessionId)
        if (session) {
          session.images.push({ src: res.path, title: 'Nueva foto' })
          setForm(nextForm)
          showToast('Foto optimizada y añadida a la galería', 'success')
        }
      } else {
        showToast('Error al subir la foto. Intenta de nuevo', 'error')
      }
    } catch (err) {
      console.error("Compression error:", err)
      showToast('Error al procesar la foto', 'error')
    } finally {
      setUploading(false)
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
      showToast('Cambios guardados con éxito', 'success')
      reload()
    } else showToast('Error al guardar los cambios. Intenta de nuevo', 'error')
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

  // Plan includes handlers
  const addInclude = (planIndex) => {
    const nextForm = JSON.parse(JSON.stringify(form))
    if (!nextForm.plans) nextForm.plans = []
    if (!nextForm.plans[planIndex].includes) nextForm.plans[planIndex].includes = []
    nextForm.plans[planIndex].includes.push('Nuevo incluido')
    setForm(nextForm)
  }

  const removeInclude = (planIndex, idx) => {
    const nextForm = JSON.parse(JSON.stringify(form))
    if (nextForm.plans && nextForm.plans[planIndex] && nextForm.plans[planIndex].includes) {
      nextForm.plans[planIndex].includes.splice(idx, 1)
      setForm(nextForm)
    }
  }

  const changeInclude = (planIndex, idx, value) => {
    const nextForm = JSON.parse(JSON.stringify(form))
    if (!nextForm.plans[planIndex].includes) nextForm.plans[planIndex].includes = []
    nextForm.plans[planIndex].includes[idx] = value
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

    // Scroll to the new session after it renders
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        // Add a temporary highlight effect
        element.style.transition = 'all 0.5s'
        element.style.boxShadow = '0 0 20px rgba(0, 180, 216, 0.4)'
        element.style.borderColor = 'var(--brand)'
        setTimeout(() => {
          element.style.boxShadow = ''
          element.style.borderColor = 'transparent'
        }, 2000)
      }
    }, 100)
  }

  const removeSession = (id) => {
    if (!confirm('¿Seguro que quieres borrar toda esta sesión?')) return
    const nextForm = JSON.parse(JSON.stringify(form))
    nextForm.sessions = nextForm.sessions.filter(s => s.id !== id)
    setForm(nextForm)
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (passForm.newPass !== passForm.confirmPass) {
      showToast('Las contraseñas nuevas no coinciden', 'error')
      return
    }
    const res = await changePassword(passForm.oldPass, passForm.newPass)
    if (res.ok) {
      showToast('Contraseña actualizada correctamente', 'success')
      setPassForm({ oldPass: '', newPass: '', confirmPass: '' })
    } else {
      showToast(res.error || 'Error al cambiar la contraseña', 'error')
    }
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <ToastContainer toasts={toasts} onClose={removeToast} />
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
              <div className="bg-white p-3 rounded-4 shadow-sm border-0 mb-4 animate-fade-in">
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
                  className={`p-3 rounded-3 mb-2 cursor-pointer transition-all ${activeTab === 'prices' ? 'bg-info bg-opacity-10 text-brand fw-bold shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveTab('prices')}
                >
                  <i className="bi bi-tag-fill me-2" /> Precios
                </div>
                <div
                  className={`p-3 rounded-3 mb-2 cursor-pointer transition-all ${activeTab === 'contact' ? 'bg-info bg-opacity-10 text-brand fw-bold shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveTab('contact')}
                >
                  <i className="bi bi-person-rolodex me-2" /> Contacto
                </div>
                <div
                  className={`p-3 rounded-3 mb-2 cursor-pointer transition-all ${activeTab === 'settings' ? 'bg-info bg-opacity-10 text-brand fw-bold shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <i className="bi bi-shield-lock-fill me-2" /> Ajustes
                </div>
                <div
                  className={`p-3 rounded-3 cursor-pointer transition-all ${activeTab === 'faq' ? 'bg-info bg-opacity-10 text-brand fw-bold shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveTab('faq')}
                >
                  <i className="bi bi-patch-question-fill me-2" /> FAQ
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
                            <ImageWithSkeleton src={form.home?.featureImage} className="rounded-3 shadow-sm" containerStyle={{ width: 120, height: 80 }} alt="imagen destacada" />
                            <input type="file" className="form-control" onChange={e => handleImage(e, 'home.featureImage')} accept="image/*" />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="form-label small fw-bold">Título Ubicación</label>
                          <input className="form-control" value={form.location?.title || ''} onChange={e => handleChange('location.title', e.target.value)} />
                        </div>
                        <div className="mb-4">
                          <label className="form-label small fw-bold">Descripción Ubicación</label>
                          <textarea className="form-control" rows={3} value={form.location?.description || ''} onChange={e => handleChange('location.description', e.target.value)} />
                        </div>
                        <div className="mb-4">
                          <label className="form-label small fw-bold">URL del Mapa (embed)</label>
                          <input className="form-control" value={form.location?.mapUrl || ''} onChange={e => handleChange('location.mapUrl', e.target.value)} placeholder="https://www.google.com/maps/embed?..." />
                          <div className="form-text small">Usa la URL de "insertar mapa" de Google Maps, no el enlace compartido.</div>
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
                            <div key={session.id} id={session.id} className="mb-5 p-4 border-0 shadow-sm rounded-4 bg-white position-relative hover-up transition-all border border-transparent hover-border-info">
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
                                    <ImageWithSkeleton src={session.mainImage} className="rounded-3 shadow-sm border" containerStyle={{ width: 80, height: 50 }} alt="portada" />
                                    <div className="flex-grow-1">
                                      <button type="button" onClick={() => fileInputRefs.current[`main-${session.id}`]?.click()} className="btn btn-sm btn-outline-info w-100 rounded-2 py-2" disabled={uploading}>{uploading ? 'Cargando...' : 'Cambiar Portada'}</button>
                                      <input
                                        ref={el => fileInputRefs.current[`main-${session.id}`] = el}
                                        type="file"
                                        className="d-none"
                                        onChange={e => handleImage(e, `sessions.${sIdx}.mainImage`)}
                                        accept="image/*"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 pt-4 border-top">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <h6 className="m-0 fw-bold text-muted"><i className="bi bi-images me-2" />Fotos en esta sesión ({session.images.length})</h6>
                                  <div>
                                    <button type="button" onClick={() => galleryFileRefs.current[`gallery-${session.id}`]?.click()} className="btn btn-sm btn-info text-white rounded-pill px-4 shadow-sm" disabled={uploading}>{uploading ? 'Subiendo...' : '+ Añadir Fotos'}</button>
                                    <input
                                      ref={el => galleryFileRefs.current[`gallery-${session.id}`] = el}
                                      type="file"
                                      className="d-none"
                                      onChange={e => handleAddGalleryImage(e, session.id)}
                                      accept="image/*"
                                    />
                                  </div>
                                </div>
                                <div className="gallery-admin-grid">
                                  {session.images.map((img, idx) => (
                                    <div key={idx} className="gallery-admin-item shadow-sm">
                                      <ImageWithSkeleton src={img.src} className="rounded-3 h-100 w-100" containerClass="h-100 w-100" alt={`img-${idx}`} />
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
                              <div className="col-12">
                                <label className="form-label small fw-bold">Incluye</label>
                                {(plan.includes || []).map((inc, idx) => (
                                  <div key={idx} className="d-flex gap-2 mb-2 align-items-center">
                                    <input className="form-control form-control-sm" value={inc} onChange={e => changeInclude(i, idx, e.target.value)} />
                                    <button type="button" onClick={() => removeInclude(i, idx)} className="btn btn-sm btn-outline-danger">✕</button>
                                  </div>
                                ))}
                                <div>
                                  <button type="button" onClick={() => addInclude(i)} className="btn btn-sm btn-outline-success">+ Añadir incluido</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="card p-4 mb-4 border-0 shadow-sm rounded-4 bg-white">
                          <h6 className="fw-bold mb-3"><i className="bi bi-calendar3 me-2" />Configuración de Calendario</h6>
                          <div className="mb-3">
                            <label className="form-label small fw-bold">Google Calendar Embed URL</label>
                            <input
                              className="form-control bg-light border-0"
                              value={form.calendar?.embedUrl || ''}
                              onChange={e => handleChange('calendar.embedUrl', e.target.value)}
                              placeholder="https://calendar.google.com/calendar/embed?src=..."
                            />
                            <div className="form-text small text-muted">Aparecerá en la sección de precios para que los clientes vean los días ocupados.</div>
                          </div>
                          <div className="mb-0">
                            <label className="form-label small fw-bold">Google Calendar ID (Público)</label>
                            <input
                              className="form-control bg-light border-0"
                              value={form.calendar?.publicId || ''}
                              onChange={e => handleChange('calendar.publicId', e.target.value)}
                              placeholder="tu-id-de-calendario@group.v.calendar.google.com"
                            />
                            <div className="form-text small text-muted">Se usa para sincronizar automáticamente el formulario de reserva.</div>
                          </div>
                        </div>

                        <div className="card p-3 mb-3 border-0 bg-white rounded-4 shadow-sm">
                          <label className="form-label small fw-bold">Número WhatsApp para "Reservar"</label>
                          <input className="form-control bg-light border-0" value={form.contact?.whatsapp || ''} onChange={e => handleChange('contact.whatsapp', e.target.value)} placeholder="Código país + número" />
                        </div>
                      </div>
                    )}

                    {activeTab === 'contact' && (
                      <div className="animate-fade-in">
                        <h5 className="fw-bold mb-4 border-bottom pb-2">Información de Contacto</h5>
                        <div className="mb-4">
                          <label className="form-label small fw-bold">WhatsApp (Solo números y +)</label>
                          <input className="form-control" value={form.contact?.whatsapp || ''} onChange={e => handleChange('contact.whatsapp', e.target.value)} placeholder="+57300..." />
                        </div>
                        <div className="mb-4">
                          <label className="form-label small fw-bold">Correo Electrónico</label>
                          <input className="form-control" value={form.contact?.email || ''} onChange={e => handleChange('contact.email', e.target.value)} placeholder="hola@ejemplo.com" />
                        </div>
                        <div className="mb-4">
                          <label className="form-label small fw-bold">Instagram (Usuario sin @)</label>
                          <input className="form-control" value={form.contact?.instagram || ''} onChange={e => handleChange('contact.instagram', e.target.value)} placeholder="usuario_insta" />
                        </div>
                        <div className="mb-4">
                          <label className="form-label small fw-bold">Facebook (Usuario o URL)</label>
                          <input className="form-control" value={form.contact?.facebook || ''} onChange={e => handleChange('contact.facebook', e.target.value)} placeholder="usuario_fb" />
                        </div>
                      </div>
                    )}

                    {activeTab === 'faq' && (
                      <div className="animate-fade-in">
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                          <h5 className="fw-bold m-0 text-dark-blue">Preguntas Frecuentes (FAQ)</h5>
                          <button className="btn btn-sm btn-brand text-white rounded-pill px-3" onClick={() => {
                            const nextForm = JSON.parse(JSON.stringify(form))
                            if (!nextForm.faqs) nextForm.faqs = []
                            nextForm.faqs.push({ question: 'Nueva Pregunta', answer: 'Nueva Respuesta' })
                            setForm(nextForm)
                          }}>+ Añadir Pregunta</button>
                        </div>

                        {(form.faqs || []).map((faq, idx) => (
                          <div key={idx} className="card p-3 mb-3 border-0 bg-light rounded-4 position-relative">
                            <div className="mb-3">
                              <label className="form-label small fw-bold">Pregunta</label>
                              <input className="form-control bg-white" value={faq.question} onChange={e => handleChange(`faqs.${idx}.question`, e.target.value)} />
                            </div>
                            <div>
                              <label className="form-label small fw-bold">Respuesta</label>
                              <textarea className="form-control bg-white" rows={2} value={faq.answer} onChange={e => handleChange(`faqs.${idx}.answer`, e.target.value)} />
                            </div>
                            <button
                              onClick={() => {
                                const nextForm = JSON.parse(JSON.stringify(form))
                                nextForm.faqs.splice(idx, 1)
                                setForm(nextForm)
                              }}
                              className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2 rounded-circle border-0"
                            >
                              <i className="bi bi-trash" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'settings' && (
                      <div className="animate-fade-in">
                        <h5 className="fw-bold mb-4 border-bottom pb-2 text-danger">Seguridad y Ajustes</h5>
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-light">
                          <h6 className="fw-bold mb-3">Cambiar Contraseña de Administrador</h6>
                          <form onSubmit={handlePasswordChange}>
                            <div className="mb-3">
                              <label className="form-label small fw-bold">Contraseña Actual</label>
                              <input type="password" name="old" className="form-control bg-white"
                                value={passForm.oldPass} onChange={e => setPassForm({ ...passForm, oldPass: e.target.value })} required />
                            </div>
                            <div className="mb-3">
                              <label className="form-label small fw-bold">Nueva Contraseña</label>
                              <input type="password" name="new" className="form-control bg-white"
                                value={passForm.newPass} onChange={e => setPassForm({ ...passForm, newPass: e.target.value })} required />
                            </div>
                            <div className="mb-4">
                              <label className="form-label small fw-bold">Confirmar Nueva Contraseña</label>
                              <input type="password" name="confirm" className="form-control bg-white"
                                value={passForm.confirmPass} onChange={e => setPassForm({ ...passForm, confirmPass: e.target.value })} required />
                            </div>
                            <button type="submit" className="btn btn-danger px-4 rounded-pill fw-bold">Actualizar Contraseña</button>
                          </form>
                        </div>

                        <div className="mt-4 p-3 bg-warning bg-opacity-10 rounded-3 border border-warning border-opacity-25">
                          <p className="small text-warning-emphasis m-0">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Recuerda guardar bien tu nueva contraseña. Si la pierdes, deberás contactar con soporte técnico para resetearla.
                          </p>
                        </div>
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
                    <div className="spinner-border text-brand" />
                    <p className="mt-2 text-muted">Cargando datos...</p>
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
