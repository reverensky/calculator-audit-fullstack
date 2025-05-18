const dotenv = require("dotenv");
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

const eventsRoutes = require("./routes/events.route");

const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const cors = require("cors");

const connectDB = require("./database/connection");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventsRoutes);
// app.use("/", analyticsRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("Healthy!");
});

// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// Global error handler
app.use((err, req, res, next) => {
  const isDevelopment = req.app.get("env") === "development";

  res.locals.message = err.message;
  res.locals.error = isDevelopment ? err : {};

  console.error(err.stack);

  res.status(err.status || 500).send(err.message || "Not Found");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
