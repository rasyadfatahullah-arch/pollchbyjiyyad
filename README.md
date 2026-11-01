# JIYYAD TOOLS — Vote Channel (Secure)

Versi aman dengan **proxy server**.  
API key **tidak pernah** dikirim ke browser.

## Cara Menjalankan

1. Install dependensi:
   ```bash
   npm install
   ```

2. Jalankan server:
   ```bash
   npm start
   ```

3. Buka browser:
   ```
   http://localhost:3000
   ```

## Struktur

```
vote-channel-secure/
├── server.js          ← API key hanya ada di sini
├── package.json
├── public/
│   └── index.html     ← Frontend (tanpa API key)
└── README.md
```

## Keamanan

- API key disimpan di `server.js` (server-side)
- Frontend hanya memanggil `/api/vote`
- Validasi URL & pesan di server
- Tidak ada API key di source browser

## Catatan

- Jangan commit / share file `server.js` yang berisi API key ke publik.
- Untuk production, simpan key di environment variable (`process.env.API_KEY`).
