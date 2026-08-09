require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  CPCB_API_URL: process.env.CPCB_API_URL || 'https://rtwqmsdb1.cpcb.gov.in/api'
};
