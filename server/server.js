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
const UPLOAD_DIR = path.join(__dirname, 'public', 'media')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })


// very simple in-memory tokens
const tokens = new Set()
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'cabana123'

app.get('/api/data', (req, res) => {
  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'no data' })
    try { res.json(JSON.parse(data)) } catch (e) { res.status(500).json({ error: 'parse' }) }
  })
})

app.post('/api/login', (req, res) => {
  const { user, pass } = req.body || {}
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
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
  // allow direct pass for legacy clients
  if (t === ADMIN_PASS) return next()
  return res.status(401).json({ ok: false, error: 'unauthorized' })
}

app.post('/api/data', checkToken, (req, res) => {
  const payload = req.body
  fs.writeFile(DATA_PATH, JSON.stringify(payload, null, 2), (err) => {
    if (err) return res.status(500).json({ ok: false })
    res.json({ ok: true })
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

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Admin server running on', PORT))
