const {
  createEvent,
  fetchEvents,
} = require("../repositories/events.repository");
const { allowedValues } = require("../config/events.json");
const ServerError = require("../errors");

async function processCollectEvent(action, value) {
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

async function processGetEvents(offset, limit) {
  try {
    const events = await fetchEvents(offset, limit);
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
