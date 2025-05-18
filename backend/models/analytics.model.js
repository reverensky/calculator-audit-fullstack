const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
  },
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ["click", "view", "navigation", "input", "custom"],
  },
  eventData: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  pageUrl: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: false,
  },
  ipAddress: {
    type: String,
    required: false,
  },
  eventLabel: {
    type: String,
  },
  expressionState: {
    type: [String],
  },
  isErrorState: {
    type: Boolean,
    required: false,
  },
  referrer: {
    type: String,
    required: false,
  },
  deviceType: {
    type: String,
    required: false,
  },
  locale: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

module.exports = mongoose.model("AnalyticsEvent", AnalyticsSchema);
