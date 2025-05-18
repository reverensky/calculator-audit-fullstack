require("dotenv").config();
const mongoose = require("mongoose");

const {
  DB_USERNAME = "admin",
  DB_PASSWORD = "admin123",
  DB_CLUSTER_URL = "wallet-system.z1fqfnl.mongodb.net",
  DB_NAME = "audit_logger_db",
  DB_RETRY_WRITES = "true",
  DB_HOST = "localhost",
  DB_PORT = "27017",
  NODE_ENV = "development",
} = process.env;

const buildDbUri = () =>
  NODE_ENV === "production"
    ? `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER_URL}/${DB_NAME}?retryWrites=${DB_RETRY_WRITES}&w=majority&appName=calculator-audit-logger`
    : `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin&retryWrites=${DB_RETRY_WRITES}`;

const dbUri = buildDbUri();

async function connectDB() {
  try {
    console.log("Connecting to MongoDB...\n", dbUri);

    await mongoose.connect(dbUri, {
      connectTimeoutMS: 20000,
      socketTimeoutMS: 10000,
      autoIndex: true,
    });

    await mongoose.connection.db.admin().command({ ping: 1 });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

module.exports = connectDB;
