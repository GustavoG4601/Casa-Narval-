import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import multer from 'multer'

const __dirname = path.resolve()
const app = express()
app.use(cors())
app.use(express.json())

const DATA_PATH = path.join(__dirname, 'src', 'data', 'data.json')
const REVIEWS_PATH = path.join(__dirname, 'src', 'data', 'reviews.json')
const CONFIG_PATH = path.join(__dirname, 'server', 'config.json')
const UPLOAD_DIR = path.join(__dirname, 'public', 'media')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

// helper to get current config
function getConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
  } catch (e) {
    return { adminUser: 'admin', adminPass: 'cabana123' }
  }
}

// very simple in-memory tokens
const tokens = new Set()

app.get('/api/data', (req, res) => {
  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'no data' })
    try { res.json(JSON.parse(data)) } catch (e) { res.status(500).json({ error: 'parse' }) }
  })
})

app.post('/api/login', (req, res) => {
  const { user, pass } = req.body || {}
  const config = getConfig()
  if (user === config.adminUser && pass === config.adminPass) {
    const token = Date.now().toString(36) + Math.random().toString(36).slice(2)
    tokens.add(token)
    return res.json({ ok: true, token })
  }
  res.json({ ok: false, error: 'Credenciales inválidas' })
})

app.get('/api/verify', (req, res) => {
  const t = req.headers['x-admin-token']
  if (tokens.has(t)) return res.json({ ok: true })
  res.json({ ok: false })
})

function checkToken(req, res, next) {
  const t = req.headers['x-admin-token'] || req.headers['x-admin-pass'] || ''
  if (tokens.has(t)) return next()
  const config = getConfig()
  if (t === config.adminPass) return next()
  return res.status(401).json({ ok: false, error: 'unauthorized' })
}

app.post('/api/change-password', checkToken, (req, res) => {
  const { oldPass, newPass } = req.body
  const config = getConfig()

  if (oldPass !== config.adminPass) {
    return res.json({ ok: false, error: 'La contraseña actual es incorrecta' })
  }

  config.adminPass = newPass
  fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), (err) => {
    if (err) return res.status(500).json({ ok: false })
    res.json({ ok: true })
  })
})

app.post('/api/data', checkToken, (req, res) => {
  const payload = req.body
  fs.writeFile(DATA_PATH, JSON.stringify(payload, null, 2), (err) => {
    if (err) return res.status(500).json({ ok: false })
    res.json({ ok: true })
  })
})

app.get('/api/reviews', (req, res) => {
  fs.readFile(REVIEWS_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'no reviews' })
    try { res.json(JSON.parse(data)) } catch (e) { res.status(500).json({ error: 'parse' }) }
  })
})

app.post('/api/reviews', (req, res) => {
  const newReview = req.body
  if (!newReview.name || !newReview.text || newReview.rating === undefined) {
    return res.status(400).json({ ok: false, error: 'datos incompletos' })
  }

  fs.readFile(REVIEWS_PATH, 'utf8', (err, data) => {
    let reviews = []
    if (!err) {
      try { reviews = JSON.parse(data) } catch (e) { }
    }

    reviews.unshift(newReview)

    fs.writeFile(REVIEWS_PATH, JSON.stringify(reviews, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ ok: false })
      res.json({ ok: true })
    })
  })
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2) + ext
    cb(null, name)
  }
})
const upload = multer({ storage })

app.post('/api/upload', checkToken, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false })
  const publicPath = '/media/' + req.file.filename
  res.json({ ok: true, path: publicPath })
})

app.get('/api/calendar', async (req, res) => {
  let { id } = req.query
  if (!id) return res.status(400).json({ error: 'Falta ID de calendario' })

  try {
    let url = id.trim()
    if (!url.startsWith('http')) {
      url = `https://calendar.google.com/calendar/ical/${encodeURIComponent(url)}/public/basic.ics`
    }

    console.log('Fetching ICS from:', url)
    const response = await fetch(url)
    if (!response.ok) throw new Error('Error al obtener calendario')

    const text = await response.text()

    // Parseo de ICS mejorado
    const dates = []
    const events = text.split('BEGIN:VEVENT')

    events.slice(1).forEach(event => {
      // Busca DTSTART y DTEND (ignorando mayúsculas/minúsculas y buscando formatos fecha o fecha+hora)
      const startMatch = event.match(/DTSTART(?:;[^:]*)?:(\d{8})/i)
      const endMatch = event.match(/DTEND(?:;[^:]*)?:(\d{8})/i)

      if (startMatch && endMatch) {
        const startStr = startMatch[1]
        const endStr = endMatch[1]

        // Crear fechas base (YYYY-MM-DD)
        const d = new Date(`${startStr.slice(0, 4)}-${startStr.slice(4, 6)}-${startStr.slice(6, 8)}T12:00:00Z`)
        const stop = new Date(`${endStr.slice(0, 4)}-${endStr.slice(4, 6)}-${endStr.slice(6, 8)}T12:00:00Z`)

        // Bloquear todas las noches en el rango
        while (d < stop) {
          dates.push(d.toISOString().split('T')[0])
          d.setUTCDate(d.getUTCDate() + 1)
        }

        // Si el evento es solo un día (start == end en el ICS a veces para eventos de 0 duration), 
        // pero Google ICS normalmente pone end = start+1 para all-day.
        // Si d == stop al inicio, al menos bloqueamos el día de inicio
        if (dates.length === 0 || (startStr === endStr && !dates.includes(startStr))) {
          dates.push(`${startStr.slice(0, 4)}-${startStr.slice(4, 6)}-${startStr.slice(6, 8)}`)
        }
      }
    })

    const busy = Array.from(new Set(dates)).sort()
    console.log('Fechas ocupadas encontradas:', busy.length)
    res.json({ busy })
  } catch (e) {
    console.error('Calendar error:', e)
    res.status(500).json({ error: 'Error procesando calendario' })
  }
})

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Admin server running on', PORT))
