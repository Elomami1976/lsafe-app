/**
 * Scoring Engine — combines all scan results into a final score,
 * verdict, confidence, checks array, and risk/safety factors.
 *
 * Score starts at 0 (safe). Points are added for each risk signal.
 *   0-20  → safe
 *  21-60  → suspicious
 *  61-100 → dangerous
 */

function computeScore({ isHttps, dns, tls, http, whois, urlhaus, patterns, hostname }) {
  let score = 0;
  const checks = [];
  const riskFactors = [];
  const safetyFactors = [];

  // ============================================
  // 1. TLS / HTTPS
  // ============================================
  if (!isHttps) {
    score += 15;
    checks.push({
      id: 'tls',
      title: 'TLS/SSL',
      status: 'fail',
      summary: 'Site does not use HTTPS — connection is not encrypted',
      scoreDelta: 15,
      help: 'HTTPS encrypts data between your browser and the server.',
    });
    riskFactors.push('No HTTPS encryption');
  } else if (tls && tls.enabled) {
    // Check certificate validity
    if (tls.daysToExpiry !== null && tls.daysToExpiry < 0) {
      score += 15;
      checks.push({
        id: 'tls',
        title: 'TLS/SSL',
        status: 'fail',
        summary: `TLS certificate EXPIRED ${Math.abs(tls.daysToExpiry)} days ago`,
        scoreDelta: 15,
        help: 'An expired certificate means the connection may not be secure.',
      });
      riskFactors.push('Expired TLS certificate');
    } else if (tls.daysToExpiry !== null && tls.daysToExpiry < 14) {
      score += 5;
      checks.push({
        id: 'tls',
        title: 'TLS/SSL',
        status: 'warn',
        summary: `TLS certificate expires in ${tls.daysToExpiry} day(s)`,
        scoreDelta: 5,
        help: 'Certificate is about to expire.',
      });
    } else {
      checks.push({
        id: 'tls',
        title: 'TLS/SSL',
        status: 'pass',
        summary: `Valid HTTPS with ${tls.protocol || 'TLS'}` + (tls.daysToExpiry ? `, expires in ${tls.daysToExpiry} days` : ''),
        scoreDelta: 0,
        help: 'HTTPS encrypts data between your browser and the server.',
      });
      safetyFactors.push('Valid HTTPS encryption');
    }
  } else {
    checks.push({
      id: 'tls',
      title: 'TLS/SSL',
      status: 'warn',
      summary: 'HTTPS used but TLS handshake could not be verified',
      scoreDelta: 5,
      help: 'Could not fully verify the TLS certificate.',
    });
    score += 5;
  }

  // ============================================
  // 2. URLhaus Malware Database
  // ============================================
  if (urlhaus && urlhaus.listed) {
    score += 40;
    const details = urlhaus.threats.join('; ') || 'Listed in URLhaus malware database';
    checks.push({
      id: 'malware',
      title: 'Malware Database',
      status: 'fail',
      summary: details,
      scoreDelta: 40,
      help: 'URLhaus (abuse.ch) tracks known malware distribution URLs.',
    });
    riskFactors.push('Listed in URLhaus malware database');
  } else {
    checks.push({
      id: 'malware',
      title: 'Malware Database',
      status: 'pass',
      summary: 'Not found in URLhaus malware database',
      scoreDelta: 0,
      help: 'URLhaus (abuse.ch) tracks known malware distribution URLs.',
    });
    safetyFactors.push('Not listed in malware databases');
  }

  // ============================================
  // 3. Phishing / Pattern Detection
  // ============================================
  const patternRisks = patterns?.risks || [];
  const patternSafety = patterns?.safety || [];

  if (patternRisks.length > 0) {
    const phishingScore = Math.min(patternRisks.length * 8, 30); // max 30 from patterns
    score += phishingScore;
    checks.push({
      id: 'phishing',
      title: 'Phishing Detection',
      status: phishingScore >= 16 ? 'fail' : 'warn',
      summary: `${patternRisks.length} suspicious pattern(s) detected`,
      scoreDelta: phishingScore,
      help: 'URL patterns are compared against known phishing techniques.',
    });
    riskFactors.push(...patternRisks);
  } else {
    checks.push({
      id: 'phishing',
      title: 'Phishing Detection',
      status: 'pass',
      summary: 'No suspicious URL patterns detected',
      scoreDelta: 0,
      help: 'URL patterns are compared against known phishing techniques.',
    });
  }
  safetyFactors.push(...patternSafety);

  // ============================================
  // 4. Domain Reputation (WHOIS-based)
  // ============================================
  if (whois && whois.domainAgeDays !== null) {
    if (whois.domainAgeDays < 30) {
      score += 20;
      checks.push({
        id: 'reputation',
        title: 'Domain Reputation',
        status: 'fail',
        summary: `Domain is only ${whois.domainAgeDays} day(s) old — very new`,
        scoreDelta: 20,
        help: 'Newly registered domains are frequently used for scams.',
      });
      riskFactors.push(`Domain registered only ${whois.domainAgeDays} days ago`);
    } else if (whois.domainAgeDays < 180) {
      score += 8;
      checks.push({
        id: 'reputation',
        title: 'Domain Reputation',
        status: 'warn',
        summary: `Domain is ${whois.domainAgeDays} days old — relatively new`,
        scoreDelta: 8,
        help: 'Young domains have less established reputation.',
      });
    } else {
      checks.push({
        id: 'reputation',
        title: 'Domain Reputation',
        status: 'pass',
        summary: `Domain is ${whois.domainAgeDays} days old (${Math.round(whois.domainAgeDays / 365)} years)`,
        scoreDelta: 0,
        help: 'Older domains tend to be more trustworthy.',
      });
      safetyFactors.push(`Established domain (${Math.round(whois.domainAgeDays / 365)} years old)`);
    }
  } else {
    checks.push({
      id: 'reputation',
      title: 'Domain Reputation',
      status: 'warn',
      summary: 'Could not determine domain age (WHOIS data unavailable)',
      scoreDelta: 3,
      help: 'WHOIS lookup did not return registration dates.',
    });
    score += 3;
  }

  // ============================================
  // 5. DNS Records
  // ============================================
  if (dns && dns.A && dns.A.length > 0) {
    checks.push({
      id: 'dns',
      title: 'DNS Records',
      status: 'pass',
      summary: `Resolves to ${dns.A[0]}` + (dns.A.length > 1 ? ` (+${dns.A.length - 1} more)` : ''),
      scoreDelta: 0,
      help: 'DNS resolution confirms the domain maps to a server.',
    });
    safetyFactors.push('Domain resolves to valid IP address');
  } else if (dns) {
    score += 10;
    checks.push({
      id: 'dns',
      title: 'DNS Records',
      status: 'fail',
      summary: 'Domain does not resolve to any IP address (no A record)',
      scoreDelta: 10,
      help: 'A domain without an A record may not be set up properly.',
    });
    riskFactors.push('Domain has no A record');
  } else {
    score += 5;
    checks.push({
      id: 'dns',
      title: 'DNS Records',
      status: 'warn',
      summary: 'DNS lookup failed or timed out',
      scoreDelta: 5,
      help: 'Could not perform DNS resolution for this domain.',
    });
  }

  // ============================================
  // 6. Security Headers
  // ============================================
  if (http && http.headers) {
    const hsts = !!http.headers['strict-transport-security'];
    const csp  = !!http.headers['content-security-policy'];
    const xctOptions = !!http.headers['x-content-type-options'];
    const xframe = !!http.headers['x-frame-options'];
    const headerCount = [hsts, csp, xctOptions, xframe].filter(Boolean).length;

    if (headerCount >= 3) {
      checks.push({
        id: 'headers',
        title: 'Security Headers',
        status: 'pass',
        summary: `${headerCount}/4 key security headers present`,
        scoreDelta: 0,
        help: 'Security headers help protect against various attacks.',
      });
      safetyFactors.push('Good security headers');
    } else if (headerCount >= 1) {
      checks.push({
        id: 'headers',
        title: 'Security Headers',
        status: 'warn',
        summary: `Only ${headerCount}/4 key security headers present`,
        scoreDelta: 3,
        help: 'Missing security headers can leave the site vulnerable.',
      });
      score += 3;
    } else {
      score += 5;
      checks.push({
        id: 'headers',
        title: 'Security Headers',
        status: 'fail',
        summary: 'No security headers detected',
        scoreDelta: 5,
        help: 'Missing security headers is a red flag for site security.',
      });
      riskFactors.push('No security headers present');
    }
  }

  // ============================================
  // 7. HTTP Response
  // ============================================
  if (http) {
    if (http.statusCode >= 200 && http.statusCode < 400) {
      checks.push({
        id: 'metadata',
        title: 'HTTP Response',
        status: 'pass',
        summary: `Server responded with status ${http.statusCode} in ${http.responseTimeMs}ms`,
        scoreDelta: 0,
        help: 'A valid HTTP response indicates the site is live.',
      });
    } else if (http.statusCode >= 400) {
      score += 5;
      checks.push({
        id: 'metadata',
        title: 'HTTP Response',
        status: 'warn',
        summary: `Server responded with error status ${http.statusCode}`,
        scoreDelta: 5,
        help: 'An error status could mean the site is down or blocking requests.',
      });
    } else if (http.statusCode === 0) {
      score += 10;
      checks.push({
        id: 'metadata',
        title: 'HTTP Response',
        status: 'fail',
        summary: 'Could not connect to server (timeout or unreachable)',
        scoreDelta: 10,
        help: 'The server did not respond. It may be offline.',
      });
      riskFactors.push('Server unreachable');
    }

    // Redirect check
    if (http.redirects && http.redirects.length > 3) {
      score += 8;
      checks.push({
        id: 'redirects',
        title: 'Redirect Chain',
        status: 'warn',
        summary: `${http.redirects.length} redirects detected — excessive chain`,
        scoreDelta: 8,
        help: 'Too many redirects can be a sign of obfuscation.',
      });
      riskFactors.push(`${http.redirects.length} redirects (excessive)`);
    }
  }

  // ============================================
  // Typosquat check — is hostname close to a major brand?
  // ============================================
  const typosquatBrand = checkTyposquat(hostname);
  if (typosquatBrand) {
    score += 15;
    checks.push({
      id: 'typosquat',
      title: 'Typo-squatting',
      status: 'fail',
      summary: `Domain looks similar to "${typosquatBrand}" — possible typosquat`,
      scoreDelta: 15,
      help: 'Typosquatting mimics popular brand names with slight misspellings.',
    });
    riskFactors.push(`Possible typosquat of "${typosquatBrand}"`);
  } else {
    checks.push({
      id: 'typosquat',
      title: 'Typo-squatting',
      status: 'pass',
      summary: 'No brand typosquatting detected',
      scoreDelta: 0,
      help: 'Typosquatting mimics popular brand names with slight misspellings.',
    });
  }

  // ============================================
  // Final score & verdict
  // ============================================
  score = Math.min(score, 100);
  let verdict;
  if (score <= 20) verdict = 'safe';
  else if (score <= 60) verdict = 'suspicious';
  else verdict = 'dangerous';

  // Confidence based on how much data we got
  let dataPoints = 0;
  if (dns) dataPoints++;
  if (tls && tls.enabled) dataPoints++;
  if (http && http.statusCode) dataPoints++;
  if (whois) dataPoints++;
  if (urlhaus) dataPoints++;
  const confidence = dataPoints >= 4 ? 'High' : dataPoints >= 2 ? 'Medium' : 'Low';

  return { checks, score, verdict, confidence, riskFactors, safetyFactors };
}

/**
 * Very basic Levenshtein-distance typosquat check for top brand domains.
 */
function checkTyposquat(hostname) {
  const brands = {
    'google.com': 'Google',
    'facebook.com': 'Facebook',
    'amazon.com': 'Amazon',
    'apple.com': 'Apple',
    'microsoft.com': 'Microsoft',
    'paypal.com': 'PayPal',
    'netflix.com': 'Netflix',
    'instagram.com': 'Instagram',
    'twitter.com': 'Twitter',
    'linkedin.com': 'LinkedIn',
    'chase.com': 'Chase',
    'bankofamerica.com': 'Bank of America',
    'wellsfargo.com': 'Wells Fargo',
  };

  // Get the registrable domain portion (last two parts)
  const parts = hostname.toLowerCase().split('.');
  const regDomain = parts.length >= 2 ? parts.slice(-2).join('.') : hostname;

  for (const [brandDomain, brandName] of Object.entries(brands)) {
    // Skip if it IS the real brand
    if (regDomain === brandDomain) continue;

    // Quick check: is edit distance small?
    const dist = levenshtein(regDomain.replace(/\..*/, ''), brandDomain.replace(/\..*/, ''));
    if (dist > 0 && dist <= 2) {
      return brandName;
    }
  }
  return null;
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

module.exports = { computeScore };
