const event = require("../models/events.model");

async function createEvent(payload) {
  try {
    const newEvent = await event.create(payload);
    return newEvent;
  } catch (error) {
    throw error;
  }
}

async function fetchEvents(offset = 0, limit = 10, session_id) {
  const query = session_id ? { session_id } : {};
  const sortQuery = { timestamp: session_id ? 1 : -1 };
  return event
    .find(query)
    .sort(sortQuery)
    .skip(parseInt(offset))
    .limit(parseInt(limit));
}

module.exports = {
  createEvent,
  fetchEvents,
};
