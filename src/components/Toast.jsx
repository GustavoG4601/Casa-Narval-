import { useState, useEffect } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, duration)
    }
    
    return id
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return { toasts, showToast, removeToast }
}

export default function Toast({ id, message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 3000)
    return () => clearTimeout(timer)
  }, [id, onClose])

  const bgColor = {
    success: 'bg-brand-light text-brand border-brand',
    error: 'bg-danger bg-opacity-10 text-danger border-danger',
    warning: 'bg-warning bg-opacity-10 text-warning border-warning',
    info: 'bg-info bg-opacity-10 text-info border-info'
  }[type] || 'bg-brand-light text-brand border-brand'

  const icon = {
    success: 'bi-check-circle-fill',
    error: 'bi-exclamation-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    info: 'bi-info-circle-fill'
  }[type] || 'bi-check-circle-fill'

  return (
    <div className={`alert border-1 ${bgColor} d-flex align-items-center gap-2 mb-0 animate-fade-in py-2 px-3`} role="alert">
      <i className={`bi ${icon} fs-6`} />
      <div className="flex-grow-1">
        <p className="m-0 small fw-500">{message}</p>
      </div>
      <button 
        type="button" 
        className="btn-close btn-close-custom btn-sm" 
        onClick={() => onClose(id)}
        aria-label="Close"
      />
    </div>
  )
}

export function ToastContainer({ toasts, onClose }) {
  return (
    <div className="position-fixed" style={{ top: '90px', right: '20px', zIndex: 1200, maxWidth: '400px' }}>
      {toasts.map(toast => (
        <div key={toast.id} className="mb-2">
          <Toast
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={onClose}
          />
        </div>
      ))}
    </div>
  )
}
