import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'

export default function ContactCard(){
  const { siteData } = useContext(AdminContext)
  const wa = siteData?.contact?.whatsapp || ''
  const email = siteData?.contact?.email || 'hola@cabanaplaya.com'
  const insta = siteData?.contact?.instagram || '@cabanaplaya_oficial'

  const displayWa = wa ? (wa.startsWith('+') ? wa : `+${wa}`) : '+57 300 680 6697'
  const waHref = wa ? `https://wa.me/${String(wa).replace(/^\+/, '').replace(/\s+/g, '')}` : 'https://wa.me/573006806697'

  return (
    <>
      <div className="d-flex align-items-center gap-4">
        <div className="bg-brand rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
          <i className="bi bi-whatsapp fs-4" />
        </div>
        <div>
          <p className="small text-white-50 m-0">Escríbenos por WhatsApp</p>
          <h6 className="m-0 fw-bold"><a href={waHref} target="_blank" rel="noreferrer" className="text-white text-decoration-none">{displayWa}</a></h6>
        </div>
      </div>

      <div className="d-flex align-items-center gap-4">
        <div className="bg-brand rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
          <i className="bi bi-envelope fs-4" />
        </div>
        <div>
          <p className="small text-white-50 m-0">Envíanos un correo</p>
          <h6 className="m-0 fw-bold">{email}</h6>
        </div>
      </div>

      <div className="d-flex align-items-center gap-4">
        <div className="bg-brand rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
          <i className="bi bi-instagram fs-4" />
        </div>
        <div>
          <p className="small text-white-50 m-0">Síguenos en redes</p>
          <h6 className="m-0 fw-bold">{insta}</h6>
        </div>
      </div>
    </>
  )
}
