const event = require("../models/events.model");
const { generateId } = require("../database/generateId");

async function createEvent(payload) {
  try {
    const eventPayload = {
      _id: generateId("events"),
      ...payload,
    };
    let newEvent = await event.create(eventPayload);
    return newEvent;
  } catch (error) {
    throw error;
  }
}

async function fetchEvents(offset = 0, limit = 10) {
  return event
    .find()
    .sort({ timestamp: -1 })
    .skip(parseInt(offset))
    .limit(parseInt(limit));
}

module.exports = {
  createEvent,
  fetchEvents,
};
