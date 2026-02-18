/**
 * WHOIS Lookup Module — uses whois-json (free, unlimited)
 * Returns domain registration info: registrar, creation/expiry dates, country.
 * 
 * Note: whois-json is an ESM package, so we use dynamic import().
 */

let _whoisJson = null;
async function getWhoisJson() {
  if (!_whoisJson) {
    const mod = await import('whois-json');
    _whoisJson = mod.default || mod;
  }
  return _whoisJson;
}

async function lookupWhois(hostname) {
  try {
    const whoisJson = await getWhoisJson();

    // Strip subdomains to get the registrable domain
    // e.g. "www.sub.example.com" → "example.com"
    const parts = hostname.split('.');
    const domain = parts.length > 2 ? parts.slice(-2).join('.') : hostname;

    const data = await whoisJson(domain, { timeout: 8000 });

    if (!data) return null;

    // whois-json can return an object or array; normalise
    const record = Array.isArray(data) ? data[0] : data;

    // Parse dates
    const creationDate = record.creationDate || record.createdDate || record.created || null;
    const expirationDate = record.registrarRegistrationExpirationDate || record.expirationDate || record.expires || null;
    const updatedDate = record.updatedDate || record.lastUpdated || null;

    // Domain age
    let domainAgeDays = null;
    if (creationDate) {
      const created = new Date(creationDate);
      if (!isNaN(created.getTime())) {
        domainAgeDays = Math.round((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));
      }
    }

    return {
      registrar: record.registrar || record.registrarName || 'Unknown',
      creationDate: creationDate || null,
      expirationDate: expirationDate || null,
      updatedDate: updatedDate || null,
      domainAgeDays,
      registrant: record.registrantOrganization || record.registrantName || 'Redacted',
      country: record.registrantCountry || record.country || null,
      nameServers: record.nameServer
        ? (Array.isArray(record.nameServer) ? record.nameServer : [record.nameServer])
        : [],
      status: record.domainStatus || record.status || null,
    };
  } catch (err) {
    // WHOIS can fail for many TLDs; non-fatal
    return null;
  }
}

module.exports = { lookupWhois };
