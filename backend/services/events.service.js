const {
  createEvent,
  fetchEvents,
} = require("../repositories/events.repository");
const { allowedValues } = require("../config/events.json");
const ServerError = require("../errors");

async function processCollectEvent(action, value, session_id) {
  // Validate action and value
  if (!allowedValues[value]) {
    throw new ServerError("INVALID_ACTION");
  }
  if (allowedValues[value] !== action) {
    throw new ServerError("INVALID_ACTION_VALUE_MAPPING");
  }

  try {
    await createEvent({
      action,
      value,
      session_id
    });
    return {
      customCode: 204,
      data: {
        message: "Event collected successfully",
      },
    };
  } catch (error) {
    console.error("Error collecting event:", error);
    throw new ServerError("CAPTURE_EVENT_FAILED");
  }
}

async function processGetEvents(offset, limit, session_id) {
  try {
    const events = await fetchEvents(offset, limit, session_id);
    return events.map((event) => ({
      id: event._id,
      action: event.action,
      value: event.value,
      timestamp: event.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new ServerError("FAILED_TO_FETCH_EVENTS");
  }
}

module.exports = {
  processCollectEvent,
  processGetEvents,
};
