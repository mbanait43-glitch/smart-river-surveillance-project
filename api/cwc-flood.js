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

  try {
    const benchmarksPath = path.join(__dirname, '../frontend/cwc-benchmarks.json');
    if (fs.existsSync(benchmarksPath)) {
      const data = JSON.parse(fs.readFileSync(benchmarksPath, 'utf8'));
      return res.status(200).json({
        status: 'success',
        source: 'Central Water Commission (CWC AFF Hydrograph Standard)',
        portal: 'https://aff.india-water.gov.in/hydro.php',
        benchmarks: data
      });
    }
  } catch(e) {}

  return res.status(200).json({
    status: 'fallback',
    source: 'Central Water Commission (CWC)',
    benchmarks: {}
  });
};
