/**
 * URL Pattern Analysis Module — pure heuristics (free, unlimited, no network)
 * Detects phishing patterns, typosquatting, suspicious URL structures.
 */

// Major brands commonly targeted by phishing
const BRAND_KEYWORDS = [
  'paypal', 'amazon', 'apple', 'google', 'microsoft', 'facebook', 'netflix',
  'instagram', 'twitter', 'linkedin', 'chase', 'wellsfargo', 'bankofamerica',
  'citibank', 'usps', 'fedex', 'dhl', 'ups', 'dropbox', 'icloud', 'outlook',
  'yahoo', 'ebay', 'walmart', 'costco', 'target', 'bestbuy',
];

// Suspicious path/keyword patterns
const PHISHING_KEYWORDS = [
  'login', 'signin', 'sign-in', 'verify', 'verification', 'account',
  'suspend', 'confirm', 'secure', 'update', 'banking', 'password',
  'credential', 'authenticate', 'wallet', 'recover', 'unlock',
  'urgent', 'alert', 'security', 'validate',
];

// Known URL shortener domains
const SHORTENERS = [
  'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd',
  'buff.ly', 'rebrand.ly', 'cutt.ly', 'shorturl.at', 'rb.gy',
];

// Common free hosting / dynamic DNS often abused
const FREE_HOSTING = [
  'blogspot.com', 'weebly.com', 'wixsite.com', '000webhostapp.com',
  'herokuapp.com', 'firebaseapp.com', 'web.app', 'pages.dev',
  'workers.dev', 'netlify.app', 'vercel.app', 'glitch.me',
  'replit.dev', 'ngrok.io', 'trycloudflare.com',
];

// Trusted TLDs (not suspicious on their own)
const TRUSTED_TLDS = ['.com', '.org', '.net', '.edu', '.gov', '.mil', '.int'];

// Suspicious TLDs often used in scams
const SUSPICIOUS_TLDS = [
  '.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.buzz',
  '.club', '.work', '.icu', '.cam', '.rest', '.surf', '.monster',
];

function analyzePatterns(urlStr, hostname) {
  const risks = [];
  const safety = [];
  const domain = hostname.toLowerCase();
  const urlLower = urlStr.toLowerCase();

  // --- Risk checks ---

  // 1. IP address instead of domain
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain)) {
    risks.push('Uses raw IP address instead of domain name');
  }

  // 2. Extremely long domain
  if (domain.length > 40) {
    risks.push(`Unusually long domain (${domain.length} characters)`);
  }

  // 3. Excessive subdomains
  const subdomainCount = domain.split('.').length - 2;
  if (subdomainCount > 3) {
    risks.push(`Excessive subdomains (${subdomainCount} levels)`);
  }

  // 4. Brand name in domain but not the real site (typosquatting)
  for (const brand of BRAND_KEYWORDS) {
    if (domain.includes(brand) && !domain.endsWith(`${brand}.com`) && !domain.endsWith(`${brand}.org`)) {
      risks.push(`Contains brand name "${brand}" but is not the official domain (possible typosquatting)`);
      break; // Only report first match
    }
  }

  // 5. Phishing keywords in path or subdomain
  const pathAndQuery = urlLower.replace(/^https?:\/\/[^/]+/, '');
  const matchedKeywords = PHISHING_KEYWORDS.filter(kw => pathAndQuery.includes(kw) || domain.includes(kw));
  if (matchedKeywords.length > 0) {
    risks.push(`Contains phishing-associated keywords: ${matchedKeywords.join(', ')}`);
  }

  // 6. URL shortener
  if (SHORTENERS.some(s => domain === s || domain.endsWith('.' + s))) {
    risks.push('URL shortener detected — final destination is unknown');
  }

  // 7. Free hosting / dynamic DNS
  const freeHost = FREE_HOSTING.find(h => domain.endsWith(h));
  if (freeHost) {
    risks.push(`Hosted on free platform (${freeHost}) — commonly abused`);
  }

  // 8. Suspicious TLD
  const tld = '.' + domain.split('.').pop();
  if (SUSPICIOUS_TLDS.includes(tld)) {
    risks.push(`Uses suspicious TLD (${tld}) — frequently associated with spam/scam`);
  }

  // 9. Multiple hyphens in domain
  const domainBase = domain.split('.').slice(0, -1).join('.');
  const hyphenCount = (domainBase.match(/-/g) || []).length;
  if (hyphenCount > 3) {
    risks.push(`Excessive hyphens in domain (${hyphenCount}) — common in phishing URLs`);
  }

  // 10. Homograph / mixed scripts detection (basic)
  if (/xn--/.test(domain)) {
    risks.push('Internationalized domain (punycode) — could be a homograph attack');
  }

  // 11. @ symbol in URL (credentials in URL trick)
  if (urlStr.includes('@')) {
    risks.push('URL contains @ symbol — may be hiding the real destination');
  }

  // 12. Double extension in path (e.g., .pdf.exe)
  if (/\.\w{2,4}\.\w{2,4}$/.test(pathAndQuery.split('?')[0])) {
    const parts = pathAndQuery.split('?')[0].split('/').pop();
    if (parts && /\.\w{2,4}\.\w{2,4}$/.test(parts)) {
      risks.push('Path contains double file extension — possible file disguise');
    }
  }

  // 13. Data URI or javascript: protocol (shouldn't happen but check)
  if (/^(data:|javascript:)/i.test(urlStr)) {
    risks.push('Non-HTTP protocol detected — potentially malicious');
  }

  // --- Safety checks ---

  if (urlStr.startsWith('https://')) {
    safety.push('Uses HTTPS encryption');
  }

  if (TRUSTED_TLDS.includes(tld)) {
    safety.push(`Uses established TLD (${tld})`);
  }

  if (domain.endsWith('.edu') || domain.endsWith('.gov')) {
    safety.push('Institutional / government domain');
  }

  if (risks.length === 0) {
    safety.push('No suspicious URL patterns detected');
  }

  if (domain.length <= 20 && subdomainCount <= 1 && hyphenCount <= 1) {
    safety.push('Clean, simple domain structure');
  }

  return { risks, safety };
}

module.exports = { analyzePatterns };
