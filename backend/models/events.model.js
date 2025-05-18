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
    index: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
