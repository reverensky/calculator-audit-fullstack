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
