/**
 * Real URL Scanner — orchestrates all free/unlimited scan modules
 * and produces a report matching the frontend's expected shape.
 */

const { resolveDns } = require('./modules/dns.cjs');
const { inspectTls } = require('./modules/tls.cjs');
const { fetchHeaders } = require('./modules/http.cjs');
const { lookupWhois } = require('./modules/whois.cjs');
const { checkUrlhaus } = require('./modules/urlhaus.cjs');
const { analyzePatterns } = require('./modules/patterns.cjs');
const { computeScore } = require('./modules/scoring.cjs');

/**
 * Main scan entry point — runs all modules in parallel and
 * assembles the final report object.
 */
async function scanUrl(rawUrl) {
  // Normalise URL
  let urlStr = rawUrl.trim();
  if (!/^https?:\/\//i.test(urlStr)) {
    urlStr = 'https://' + urlStr;
  }

  let parsed;
  try {
    parsed = new URL(urlStr);
  } catch {
    throw new Error('Invalid URL format');
  }

  const hostname = parsed.hostname;
  const isHttps = parsed.protocol === 'https:';

  // Run all independent scans in parallel
  const [dnsResult, tlsResult, httpResult, whoisResult, urlhausResult, patternResult] =
    await Promise.allSettled([
      resolveDns(hostname),
      isHttps ? inspectTls(hostname) : Promise.resolve({ enabled: false }),
      fetchHeaders(urlStr),
      lookupWhois(hostname),
      checkUrlhaus(urlStr, hostname),
      analyzePatterns(urlStr, hostname),
    ]);

  // Unwrap settled results (use null on failure)
  const dns      = dnsResult.status === 'fulfilled'    ? dnsResult.value      : null;
  const tls      = tlsResult.status === 'fulfilled'    ? tlsResult.value      : { enabled: false };
  const http     = httpResult.status === 'fulfilled'    ? httpResult.value     : null;
  const whois    = whoisResult.status === 'fulfilled'   ? whoisResult.value    : null;
  const urlhaus  = urlhausResult.status === 'fulfilled' ? urlhausResult.value  : { listed: false };
  const patterns = patternResult.status === 'fulfilled' ? patternResult.value  : { risks: [], safety: [] };

  // Build checks array + compute score
  const { checks, score, verdict, confidence, riskFactors, safetyFactors } =
    computeScore({ isHttps, dns, tls, http, whois, urlhaus, patterns, hostname });

  // Build summary text
  let summary;
  if (verdict === 'safe') {
    summary = `This URL appears to be safe. All major security checks passed for ${hostname}.`;
  } else if (verdict === 'suspicious') {
    summary = `This URL shows some suspicious indicators for ${hostname}. Proceed with caution.`;
  } else {
    summary = `This URL shows multiple red flags for ${hostname}. We recommend avoiding it.`;
  }

  // Security headers audit
  const headers = http ? buildHeadersAudit(http.headers) : null;

  // Metadata
  const metadata = http ? {
    title: http.title || null,
    description: http.metaDescription || null,
    language: http.headers?.['content-language'] || null,
    contentType: http.headers?.['content-type'] || null,
    contentLength: http.headers?.['content-length'] ? parseInt(http.headers['content-length'], 10) : null,
    status: http.statusCode,
    finalUrl: http.finalUrl || urlStr,
  } : null;

  // Network info
  const network = {
    resolvedIp: dns?.A?.[0] || 'N/A',
    domainReputation: verdict === 'safe' ? 'Good' : verdict === 'suspicious' ? 'Questionable' : 'Poor',
    location: whois?.country || 'Unknown',
    provider: whois?.registrar || http?.headers?.['server'] || 'Unknown',
  };

  return {
    normalizedUrl: urlStr,
    verdict,
    score,
    confidence,
    summary,
    scannedAt: new Date().toISOString(),
    checks,
    network,
    dns: dns || null,
    tls: tls || null,
    headers,
    metadata,
    redirects: http?.redirects || [],
    riskFactors,
    safetyFactors,
    whois: whois || null,
    urlhaus: urlhaus || null,
    // Raw evidence for the debug panels
    raw: {
      fetchRes: http || {},
      tlsInfo: tls || {},
      dnsInfo: dns || {},
    },
  };
}

/**
 * Audit common security headers.
 */
function buildHeadersAudit(headers) {
  if (!headers) return [];

  const securityHeaders = [
    {
      header: 'Strict-Transport-Security',
      key: 'strict-transport-security',
      recommendation: 'Add HSTS header to force HTTPS connections.',
    },
    {
      header: 'Content-Security-Policy',
      key: 'content-security-policy',
      recommendation: 'Add CSP header to prevent XSS and injection attacks.',
    },
    {
      header: 'X-Content-Type-Options',
      key: 'x-content-type-options',
      recommendation: 'Add "nosniff" to prevent MIME-type sniffing.',
    },
    {
      header: 'X-Frame-Options',
      key: 'x-frame-options',
      recommendation: 'Add X-Frame-Options to prevent clickjacking.',
    },
    {
      header: 'X-XSS-Protection',
      key: 'x-xss-protection',
      recommendation: 'Consider adding X-XSS-Protection for older browsers.',
    },
    {
      header: 'Referrer-Policy',
      key: 'referrer-policy',
      recommendation: 'Add Referrer-Policy to control what information is sent.',
    },
    {
      header: 'Permissions-Policy',
      key: 'permissions-policy',
      recommendation: 'Add Permissions-Policy to restrict browser features.',
    },
  ];

  return securityHeaders.map(({ header, key, recommendation }) => {
    const value = headers[key];
    if (value) {
      return { header, status: 'pass', value, recommendation: null };
    }
    return { header, status: 'fail', value: null, recommendation };
  });
}

module.exports = { scanUrl };
