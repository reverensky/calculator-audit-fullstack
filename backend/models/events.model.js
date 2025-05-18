const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  timestamp: {
    type: Date,
    required: true,
    index: true,
    default: Date.now,
  },
  action: {
    type: String,
    required: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  session_id: {
    type: String,
    required: true,
    index: true,
  },
});

eventSchema.index({ session_id: 1, timestamp: 1 });

module.exports = mongoose.model("Event", eventSchema);
