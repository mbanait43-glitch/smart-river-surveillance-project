const express = require('express');
const cors = require('cors');
const path = require('path');
const { PORT } = require('./config/env');
const apiRoutes = require('./routes/api.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api', apiRoutes);

// Fallback for SPA or generic 404
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
