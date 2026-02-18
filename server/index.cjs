/**
 * LSafe Backend API Server
 * 
 * Provides real URL scanning using only free, unlimited sources:
 *  - Node.js dns module (real DNS resolution)
 *  - Node.js tls module (real TLS certificate inspection)
 *  - Node.js https/http (real HTTP HEAD + redirect following)
 *  - whois-json (real WHOIS / domain age)
 *  - URLhaus API (abuse.ch — free, no key, unlimited)
 *  - PhishTank-style heuristics
 */

const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');

const { scanUrl } = require('./scanner.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

// --------------- Middleware ---------------

app.use(express.json());

// Rate-limit the scan endpoint: 20 scans per minute per IP
const scanLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many scan requests. Please try again in a minute.' },
});

// CORS — allow your Hostinger frontend domain + local dev
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  // Add your domain(s) here:
  'https://lsafe.io',
  'https://www.lsafe.io',
  'https://tryanswerly.site',
  'https://www.tryanswerly.site',
  process.env.FRONTEND_URL, // optional env override
].filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// --------------- API Routes ---------------

app.get('/api/scan', scanLimiter, async (req, res) => {
  const url = req.query.url;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing ?url= query parameter' });
  }

  try {
    const report = await scanUrl(url);
    res.json(report);
  } catch (err) {
    console.error('Scan error:', err);
    res.status(500).json({ error: 'Scan failed: ' + (err.message || 'Unknown error') });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --------------- Static files (production) ---------------

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  // SPA fallback
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

// --------------- Start ---------------

app.listen(PORT, () => {
  console.log(`[LSafe API] Server running on http://localhost:${PORT}`);
});
