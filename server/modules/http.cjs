/**
 * HTTP Fetch Module — uses built-in Node.js http/https (free, unlimited)
 * Performs a real HTTP request, follows redirects, captures headers,
 * response time, status codes, and basic page metadata.
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

const MAX_REDIRECTS = 10;
const TIMEOUT_MS = 10000;

/**
 * Fetch headers + follow redirects manually so we can record the chain.
 */
async function fetchHeaders(urlStr) {
  const redirects = [];
  let currentUrl = urlStr;
  let finalHeaders = {};
  let statusCode = 0;
  let responseTimeMs = 0;
  let body = '';

  for (let i = 0; i < MAX_REDIRECTS; i++) {
    const result = await singleRequest(currentUrl);

    statusCode = result.statusCode;
    finalHeaders = result.headers;
    responseTimeMs += result.timeMs;

    if ([301, 302, 303, 307, 308].includes(statusCode) && result.headers.location) {
      const nextUrl = new URL(result.headers.location, currentUrl).href;
      redirects.push({
        url: currentUrl,
        status: statusCode,
        location: nextUrl,
        timeMs: result.timeMs,
      });
      currentUrl = nextUrl;
    } else {
      body = result.body;
      break;
    }
  }

  // Extract basic metadata from body
  let title = null;
  let metaDescription = null;
  const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) title = titleMatch[1].trim();
  const descMatch = body.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  if (descMatch) metaDescription = descMatch[1].trim();

  return {
    statusCode,
    headers: finalHeaders,
    redirects,
    finalUrl: currentUrl,
    responseTimeMs,
    title,
    metaDescription,
    body: null, // Don't include the full body in the report
  };
}

function singleRequest(urlStr) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    let parsed;
    try {
      parsed = new URL(urlStr);
    } catch {
      return resolve({ statusCode: 0, headers: {}, timeMs: 0, body: '' });
    }

    const client = parsed.protocol === 'https:' ? https : http;

    const req = client.request(
      urlStr,
      {
        method: 'GET', // GET so we can read a bit of the body for metadata
        timeout: TIMEOUT_MS,
        headers: {
          'User-Agent': 'LSafe-Scanner/1.0 (+https://lsafe.io)',
          'Accept': 'text/html,application/xhtml+xml,*/*',
        },
        // Don't validate certs — we need to inspect bad sites too
        rejectUnauthorized: false,
      },
      (res) => {
        const chunks = [];
        let totalBytes = 0;
        const MAX_BODY = 64 * 1024; // Read at most 64 KB for metadata extraction

        res.on('data', (chunk) => {
          totalBytes += chunk.length;
          if (totalBytes <= MAX_BODY) {
            chunks.push(chunk);
          }
        });

        res.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf-8');
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            timeMs: Date.now() - startTime,
            body,
          });
        });

        res.on('error', () => {
          resolve({ statusCode: 0, headers: {}, timeMs: Date.now() - startTime, body: '' });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      resolve({ statusCode: 0, headers: {}, timeMs: Date.now() - startTime, body: '' });
    });

    req.on('error', () => {
      resolve({ statusCode: 0, headers: {}, timeMs: Date.now() - startTime, body: '' });
    });

    req.end();
  });
}

module.exports = { fetchHeaders };
