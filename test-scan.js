const fetch = require('node-fetch');

fetch('http://localhost:5050/api/v1/scan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://example.com' })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
