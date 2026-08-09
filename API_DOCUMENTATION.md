# API Documentation

This document describes the backend endpoints provided by the Smart River Surveillance Node.js API layer.

## Context

The backend is built as a data layer between the frontend and the Central Pollution Control Board (CPCB). However, because CPCB does not provide a public Real-Time API, these endpoints currently return a `503 Service Unavailable` status and a graceful error message indicating the lack of public access. 

---

### `GET /api/states`
**Purpose:** Fetch all states available in the CPCB database.
- **Method:** `GET`
- **Parameters:** None
- **Headers:** None
- **Response:** `503 Service Unavailable`
  ```json
  {
    "success": false,
    "message": "CPCB public API is unavailable.",
    "data": []
  }
  ```

---

### `GET /api/rivers`
**Purpose:** Fetch rivers associated with a specific state.
- **Method:** `GET`
- **Parameters:** `?stateId={id}`
- **Response:** `503 Service Unavailable`
  ```json
  {
    "success": false,
    "message": "CPCB public API is unavailable.",
    "data": []
  }
  ```

---

### `GET /api/stations`
**Purpose:** Fetch monitoring stations along a specific river.
- **Method:** `GET`
- **Parameters:** `?riverId={id}`
- **Response:** `503 Service Unavailable`

---

### `GET /api/stations/:id/latest`
**Purpose:** Fetch the latest real-time readings (pH, DO, Turbidity, Water Level) for a station.
- **Method:** `GET`
- **Parameters:** `id` (Station ID path parameter)
- **Response:** `503 Service Unavailable`
  ```json
  {
    "success": false,
    "message": "CPCB public API is unavailable. Cannot fetch live data.",
    "data": null
  }
  ```

---

### `GET /api/stations/:id/history`
**Purpose:** Fetch historical data arrays for charting purposes.
- **Method:** `GET`
- **Parameters:** `id` (Station ID path parameter)
- **Response:** `503 Service Unavailable`
  ```json
  {
    "success": false,
    "message": "Historical data is not available from CPCB public endpoints.",
    "data": []
  }
  ```
