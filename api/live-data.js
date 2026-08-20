const https = require('https');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const fetchLive = () => {
    return new Promise((resolve) => {
      const timestamp = Date.now();
      const url = `https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json?t=${timestamp}`;
      const agent = new https.Agent({ rejectUnauthorized: false });

      const request = https.get(url, {
        agent,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        timeout: 25000
      }, (response) => {
        if (response.statusCode !== 200) {
          return resolve(null);
        }
        let raw = '';
        response.on('data', chunk => raw += chunk);
        response.on('end', () => {
          try {
            const data = JSON.parse(raw);
            if (Array.isArray(data) && data.length > 0) {
              return resolve(data);
            }
          } catch(e) {}
          resolve(null);
        });
      });

      request.on('error', () => resolve(null));
      request.on('timeout', () => {
        request.destroy();
        resolve(null);
      });
    });
  };

  try {
    const liveData = await fetchLive();
    if (liveData && liveData.length > 0) {
      return res.status(200).json(liveData);
    }
  } catch (err) {}

  // Fallback to local fallback dataset if live CPCB fails
  try {
    const paths = [
      path.join(__dirname, '../backend/fallback-data.json'),
      path.join(__dirname, '../frontend/fallback-data.json'),
      path.join(process.cwd(), 'frontend/fallback-data.json'),
      path.join(process.cwd(), 'backend/fallback-data.json')
    ];
    for (const p of paths) {
      if (fs.existsSync(p)) {
        const data = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (Array.isArray(data) && data.length > 0) {
          return res.status(200).json(data);
        }
      }
    }
  } catch(e) {}

  return res.status(200).json([]);
};
