module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const timestamp = Date.now();
  const endpoints = [
    `https://corsproxy.io/?https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json?t=${timestamp}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json?t=${timestamp}`)}`,
    `https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json?t=${timestamp}`
  ];

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return res.status(200).json(data);
        }
      }
    } catch (err) {}
  }

  return res.status(200).json([]);
};
