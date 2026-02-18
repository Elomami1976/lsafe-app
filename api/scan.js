/**
 * Vercel Serverless Function — /api/scan
 * Reuses the existing scanner modules from server/
 */
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { scanUrl } = require('../server/scanner.cjs');

// Rate limiting via simple in-memory store (per instance)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 20;

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return true;
  }
  record.count++;
  return record.count <= RATE_LIMIT_MAX;
}

export const config = {
  maxDuration: 30, // seconds — enough for parallel scans
};

export default async function handler(req, res) {
  // CORS
  const origin = req.headers.origin || '';
  if (
    origin.includes('localhost') ||
    origin.includes('127.0.0.1') ||
    origin.includes('lsafe.io') ||
    origin.includes('tryanswerly.site') ||
    origin.includes('vercel.app')
  ) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // Simple rate limit
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many scan requests. Please try again in a minute.' });
  }

  const url = req.query.url;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing ?url= query parameter' });
  }

  try {
    const report = await scanUrl(url);
    return res.status(200).json(report);
  } catch (err) {
    console.error('Scan error:', err);
    return res.status(500).json({ error: 'Scan failed: ' + (err.message || 'Unknown error') });
  }
}
