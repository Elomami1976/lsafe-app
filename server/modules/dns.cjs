/**
 * DNS Resolution Module — uses built-in Node.js dns (free, unlimited)
 * Returns real A, AAAA, MX, NS, TXT, CNAME, SOA records.
 */

const dns = require('dns');
const { promisify } = require('util');

const resolve4   = promisify(dns.resolve4);
const resolve6   = promisify(dns.resolve6);
const resolveMx  = promisify(dns.resolveMx);
const resolveNs  = promisify(dns.resolveNs);
const resolveTxt = promisify(dns.resolveTxt);
const resolveCname = promisify(dns.resolveCname);
const resolveSoa = promisify(dns.resolveSoa);

async function resolveDns(hostname) {
  const results = {};

  const tasks = [
    resolve4(hostname).then(r => { results.A = r; }).catch(() => {}),
    resolve6(hostname).then(r => { results.AAAA = r; }).catch(() => {}),
    resolveMx(hostname).then(r => {
      results.MX = r.map(mx => `${mx.priority} ${mx.exchange}`);
    }).catch(() => {}),
    resolveNs(hostname).then(r => { results.NS = r; }).catch(() => {}),
    resolveTxt(hostname).then(r => {
      results.TXT = r.map(arr => arr.join(''));
    }).catch(() => {}),
    resolveCname(hostname).then(r => { results.CNAME = r; }).catch(() => {}),
    resolveSoa(hostname).then(r => {
      results.SOA = r ? [`${r.nsname} ${r.hostmaster} (serial: ${r.serial})`] : [];
    }).catch(() => {}),
  ];

  await Promise.all(tasks);
  return results;
}

module.exports = { resolveDns };
