# Smart River Water Level and Quality Surveillance

A professional web dashboard built to monitor river water quality and water levels. 

## Project Overview

This full-stack application provides a modern, responsive interface for viewing river water metrics. The architecture includes an Express.js backend meant to interface with the Central Pollution Control Board (CPCB) Real-Time Water Quality Monitoring System (RTWQMS).

## Important Note on CPCB Data Source

**Data Limitation:** Following an exhaustive investigation of the official CPCB RTWQMS dashboard (`https://rtwqmsdb1.cpcb.gov.in/#/`), it was determined that **there is no public developer API available for real-time water quality data**.
The application is built to be strictly honest about data availability and will gracefully report "CPCB data temporarily unavailable" rather than fabricating numbers, circumventing security, or scraping private endpoints.

### API Investigation Results
- Frontend JS bundles were analyzed.
- No public HTTP REST endpoints were discovered.
- Queries to common CPCB domains returned 404s.
- `data.gov.in` provides historical datasets but no live streaming API for water quality.

## Features

- **Responsive Modern UI:** Includes Light and Dark mode, built with HTML/CSS/JS.
- **Data Layers:** Backend Node/Express API designed to proxy and cache requests.
- **Monitoring Tools:** Includes "Start Monitoring" logic and Chart.js / Leaflet integrations.
- **Graceful Degradation:** Transparently displays missing data when external APIs are unreachable.

## Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript, Chart.js, Leaflet.js, FontAwesome
- **Backend:** Node.js, Express.js
- **Environment Management:** dotenv

## Installation

1. Clone the repository.
2. Navigate to the project folder:
   ```bash
   cd smart-river-surveillance
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

## How to Run

Start the backend server (which also serves the static frontend):
```bash
node backend/server.js
```
Then open your browser to `http://localhost:3000`.

## Future Improvements
- **Data Integrations:** Connect to official CPCB datasets via batch imports if an open-data portal API is launched.
- **Alert System Expansion:** Implement push notifications based on verified water quality thresholds.
