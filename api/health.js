/**
 * Vercel Serverless Function — /api/health
 */
export default function handler(req, res) {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
}
