const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const id = (req.body && req.body.id) ? String(req.body.id) : 'img';
    const ext = path.extname(file.originalname) || '.jpg';
    const safeId = id.replace(/[^a-zA-Z0-9-_]/g, '_');
    const name = `${safeId}-${Date.now()}${ext}`;
    cb(null, name);
  }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const relPath = `/uploads/${req.file.filename}`;
  // Update mapping file for static build consumption
  try {
    const mapPath = path.join(UPLOADS_DIR, 'images-map.json');
    let map = {};
    if (fs.existsSync(mapPath)) {
      try {
        map = JSON.parse(fs.readFileSync(mapPath, 'utf-8')) || {};
      } catch {}
    }
    const id = (req.body && req.body.id) ? String(req.body.id) : 'img';
    map[id] = relPath; // store relative path (no domain, no base)
    fs.writeFileSync(mapPath, JSON.stringify(map, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to update images-map.json:', e);
  }
  return res.json({ url: relPath });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Upload server running at http://localhost:${PORT}`);
});
