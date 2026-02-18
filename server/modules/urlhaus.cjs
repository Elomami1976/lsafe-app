/**
 * URLhaus Threat Check Module — abuse.ch (free, no API key, unlimited)
 * Checks if a URL or host is listed in the URLhaus malware database.
 */

const https = require('https');
const querystring = require('querystring');

const URLHAUS_URL_ENDPOINT = 'https://urlhaus-api.abuse.ch/v1/url/';
const URLHAUS_HOST_ENDPOINT = 'https://urlhaus-api.abuse.ch/v1/host/';

/**
 * Check both the full URL and the hostname against URLhaus.
 */
async function checkUrlhaus(url, hostname) {
  const [urlResult, hostResult] = await Promise.allSettled([
    queryUrlhaus(URLHAUS_URL_ENDPOINT, { url }),
    queryUrlhaus(URLHAUS_HOST_ENDPOINT, { host: hostname }),
  ]);

  const urlData  = urlResult.status === 'fulfilled'  ? urlResult.value  : null;
  const hostData = hostResult.status === 'fulfilled' ? hostResult.value : null;

  // Only consider "listed" if the API explicitly says it found something.
  // query_status must be a positive match — anything else (no_results,
  // invalid_url, errors, null) is treated as "not listed".
  const urlListed  = urlData  && urlData.query_status  === 'ok';
  const hostListed = hostData && hostData.query_status === 'is_host';
  const listed = !!(urlListed || hostListed);

  const threats = [];
  
  if (urlListed && urlData.threat) {
    threats.push(`URLhaus: ${urlData.threat} (${urlData.url_status || 'active'})`);
  }
  if (hostListed && hostData.urls && hostData.urls.length > 0) {
    threats.push(`Host has ${hostData.urls.length} known malware URL(s) in URLhaus`);
  }

  return {
    listed,
    threats,
    urlData: urlListed ? urlData : null,
    hostData: hostListed ? { urlCount: hostData.url_count || 0 } : null,
  };
}

function queryUrlhaus(endpoint, params) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify(params);

    const req = https.request(
      endpoint,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
          'User-Agent': 'LSafe-Scanner/1.0',
        },
        timeout: 8000,
      },
      (res) => {
        const chunks = [];
        res.on('data', (d) => chunks.push(d));
        res.on('end', () => {
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString()));
          } catch {
            resolve(null);
          }
        });
      }
    );

    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.on('error', () => resolve(null));
    req.write(postData);
    req.end();
  });
}

module.exports = { checkUrlhaus };
