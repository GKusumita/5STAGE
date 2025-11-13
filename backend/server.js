// ---------------------------------------------
// Simple Cache Service - Backend
// ---------------------------------------------

const express = require("express");
const cors = require("cors");

const Cache = require("./cache/cache");

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Cache instance
const cache = new Cache();

// ---------------------------------------------
// SCRUM-12: Health endpoint
// ---------------------------------------------
app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    service: "simple-cache",
    timestamp: new Date().toISOString()
  });
});

// ---------------------------------------------
// SCRUM-15: Metrics endpoint
// ---------------------------------------------
app.get("/metrics", (req, res) => {
  const stats = cache.getStats();
  return res.status(200).json(stats);
});

// ---------------------------------------------
// Root endpoint
// ---------------------------------------------
app.get("/", (req, res) => {
  res.status(200).json({ message: "Simple Cache Service Running" });
});

// ---------------------------------------------
// Start Server
// ---------------------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Simple cache listening on port ${PORT}`);
});

module.exports = app;
