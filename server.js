/**
 * JIYYAD TOOLS - Vote Channel (Secure Proxy)
 * API key hanya ada di sisi server, tidak pernah dikirim ke browser.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ========== KONFIGURASI (JANGAN BAGIKAN) ==========
const API_URL = 'https://api.jerexd.my.id/api/whatsapp/votech';
const API_KEY = 'N8bqKDxz2g5vYpdw';
// ==================================================

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint - frontend hanya memanggil /api/vote
app.post('/api/vote', async (req, res) => {
  try {
    const { url, pesan } = req.body || {};

    if (!url || typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({
        status: false,
        message: 'URL channel wajib diisi'
      });
    }

    if (!pesan || typeof pesan !== 'string' || !pesan.trim()) {
      return res.status(400).json({
        status: false,
        message: 'Pesan vote wajib diisi'
      });
    }

    // Validasi sederhana format URL WhatsApp
    if (!url.includes('whatsapp.com/channel/')) {
      return res.status(400).json({
        status: false,
        message: 'URL harus berupa link channel WhatsApp yang valid'
      });
    }

    const response = await fetch(`${API_URL}?apikey=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url.trim(),
        pesan: pesan.trim()
      })
    });

    const data = await response.json();

    // Teruskan response dari API (tanpa membocorkan key)
    return res.status(response.status).json(data);
  } catch (err) {
    console.error('[Vote Proxy Error]', err.message);
    return res.status(500).json({
      status: false,
      message: 'Terjadi kesalahan pada server proxy',
      error: err.message
    });
  }
});

// Fallback ke index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  ⚡ JIYYAD TOOLS - Vote Channel`);
  console.log(`  ➜  Local:   http://localhost:${PORT}`);
  console.log(`  ➜  API key tersembunyi di server\n`);
});
