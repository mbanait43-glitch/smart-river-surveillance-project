/**
 * Service to interact with live CPCB Data.
 * Fetches real-time water quality data from the live CPCB RTWQMS endpoint with Cache-Busting.
 */

class CPCBService {
  async getLiveData() {
    try {
      // Add timestamp to prevent CDN & Browser caching
      const timestamp = Date.now();
      const url = `https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json?t=${timestamp}`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`CPCB Server responded with status ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data };
    } catch (error) {
      console.error('CPCB Proxy Fetch Error:', error.message);
      return { success: false, error: error.message, data: [] };
    }
  }
}

module.exports = new CPCBService();
