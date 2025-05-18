const {
  createEvent,
  fetchEvents,
} = require("../repositories/events.repository");

async function processCollectEvent(action, value) {
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
    return { customCode: 500, data: { message: "Internal server error" } };
  }
}

async function processGetEvents() {
  try {
    const events = await fetchEvents();
    return events.map((event) => ({
      id: event._id,
      action: event.action,
      value: event.value,
      timestamp: event.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return { customCode: 500, data: { message: "Internal server error" } };
  }
}

module.exports = {
  processCollectEvent,
  processGetEvents,
};
