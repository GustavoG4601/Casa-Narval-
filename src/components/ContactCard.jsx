import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'

export default function ContactCard() {
  const { siteData } = useContext(AdminContext)
  const contact = siteData?.contact || {}

  const wa = contact.whatsapp || ''
  const email = contact.email || 'hola@casanarval.com'
  const insta = contact.instagram || 'casanarval_cartagena'

  const displayWa = wa ? (wa.startsWith('+') ? wa : `+${wa}`) : '+57 300 680 6697'
  const waHref = wa ? `https://wa.me/${String(wa).replace(/^\+/, '').replace(/\s+/g, '')}` : 'https://wa.me/573006806697'
  const instaUrl = `https://instagram.com/${insta.replace('@', '')}`

  return (
    <>
      <div className="d-flex align-items-center gap-3 transition-all">
        <div className="bg-brand-light text-brand rounded-4 p-3 d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
          <i className="bi bi-whatsapp fs-3" />
        </div>
        <div>
          <p className="small text-muted fw-bold m-0 text-uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>WHATSAPP</p>
          <h6 className="m-0 fw-bold">
            <a href={waHref} target="_blank" rel="noreferrer" className="text-dark-blue text-decoration-none hover-text-brand transition-all">
              {displayWa}
            </a>
          </h6>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 transition-all">
        <div className="bg-brand-light text-brand rounded-4 p-3 d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
          <i className="bi bi-envelope fs-3" />
        </div>
        <div>
          <p className="small text-muted fw-bold m-0 text-uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>EMAIL</p>
          <h6 className="m-0 fw-bold">
            <a href={`mailto:${email}`} className="text-dark-blue text-decoration-none hover-text-brand transition-all">
              {email}
            </a>
          </h6>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 transition-all">
        <div className="bg-brand-light text-brand rounded-4 p-3 d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
          <i className="bi bi-instagram fs-3" />
        </div>
        <div>
          <p className="small text-muted fw-bold m-0 text-uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>INSTAGRAM</p>
          <h6 className="m-0 fw-bold">
            <a href={instaUrl} target="_blank" rel="noreferrer" className="text-dark-blue text-decoration-none hover-text-brand transition-all">
              @{insta.replace('@', '')}
            </a>
          </h6>
        </div>
      </div>
    </>
  )
}
