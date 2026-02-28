import React, { createContext, useEffect, useState, useCallback } from 'react'

export const AdminContext = createContext()

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '')
  const [siteData, setSiteData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const r = await fetch('/api/data')
      if (!r.ok) throw new Error('Failed to fetch')
      const d = await r.json()
      setSiteData(d)
    } catch (e) {
      console.error("Error loading site data:", e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Verify admin token if exists
    if (token) {
      fetch('/api/verify', { headers: { 'x-admin-token': token } })
        .then(r => r.json())
        .then(data => { if (data?.ok) setIsAdmin(true); else logout() })
        .catch(() => { })
    }
    fetchData()
  }, [token, fetchData])

  async function login(user, pass) {
    try {
      const res = await fetch('/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass })
      })
      const data = await res.json()
      if (data?.ok && data.token) {
        setToken(data.token)
        setIsAdmin(true)
        return true
      }
      return false
    } catch (err) {
      alert("Error de conexión con el servidor.")
      return false
    }
  }

  function logout() {
    setToken('')
    setIsAdmin(false)
    localStorage.removeItem('admin_token')
  }

  async function saveData(newData) {
    try {
      const r = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify(newData)
      })
      const d = await r.json()
      if (d?.ok) {
        setSiteData(newData)
        return true
      }
      return false
    } catch (e) {
      console.error("Save error:", e)
      return false
    }
  }

  async function uploadImage(file) {
    try {
      const fd = new FormData()
      fd.append('file', file)
      const r = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'x-admin-token': token },
        body: fd
      })
      return await r.json()
    } catch (e) {
      console.error("Upload error:", e)
      return { ok: false }
    }
  }

  return (
    <AdminContext.Provider value={{
      isAdmin,
      login,
      logout,
      siteData,
      loading,
      reload: fetchData,
      saveData,
      uploadImage
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContext
