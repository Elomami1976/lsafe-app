/**
 * TLS Certificate Inspection Module — uses built-in Node.js tls (free, unlimited)
 * Connects to port 443, grabs the real certificate, and returns details.
 */

const tls = require('tls');

function inspectTls(hostname, port = 443, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host: hostname, port, servername: hostname, rejectUnauthorized: false }, () => {
      try {
        const cert = socket.getPeerCertificate(true);
        const protocol = socket.getProtocol();   // e.g. "TLSv1.3"
        const cipher = socket.getCipher();

        if (!cert || !cert.subject) {
          socket.destroy();
          return resolve({ enabled: false });
        }

        const validFrom = cert.valid_from ? new Date(cert.valid_from).toISOString() : null;
        const validTo   = cert.valid_to   ? new Date(cert.valid_to).toISOString()   : null;

        let daysToExpiry = null;
        if (validTo) {
          daysToExpiry = Math.round((new Date(validTo).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        }

        // Build issuer string
        const issuerParts = [];
        if (cert.issuer) {
          if (cert.issuer.O)  issuerParts.push(cert.issuer.O);
          if (cert.issuer.CN) issuerParts.push(cert.issuer.CN);
        }

        // Build subject string
        const subjectParts = [];
        if (cert.subject) {
          if (cert.subject.CN) subjectParts.push(cert.subject.CN);
          if (cert.subject.O)  subjectParts.push(cert.subject.O);
        }

        // SAN (Subject Alternative Names)
        const san = cert.subjectaltname
          ? cert.subjectaltname.split(', ').map(s => s.replace('DNS:', ''))
          : [];

        socket.destroy();

        resolve({
          enabled: true,
          protocol: protocol || 'Unknown',
          cipher: cipher ? `${cipher.name} (${cipher.version})` : 'Unknown',
          issuer: issuerParts.join(' — ') || 'Unknown',
          subject: subjectParts.join(' — ') || 'Unknown',
          validFrom,
          validTo,
          daysToExpiry,
          san,
          fingerprintSha256: cert.fingerprint256 || cert.fingerprint || 'N/A',
          serialNumber: cert.serialNumber || 'N/A',
        });
      } catch (err) {
        socket.destroy();
        resolve({ enabled: false, error: err.message });
      }
    });

    socket.setTimeout(timeoutMs, () => {
      socket.destroy();
      resolve({ enabled: false, error: 'Connection timed out' });
    });

    socket.on('error', (err) => {
      socket.destroy();
      resolve({ enabled: false, error: err.message });
    });
  });
}

module.exports = { inspectTls };
