const analyticsEvent = require("../models/analytics.model");
const { generateId } = require("../database/generateId");

async function collectEvent(payload) {
  const {
    userId,
    sessionId,
    eventType,
    eventData,
    pageUrl,
    userAgent,
    ipAddress,
  } = payload;

  let analytics = new analyticsEvent({
    id: generateId("analytics"),
    userId,
    sessionId,
    eventType,
    eventData,
    pageUrl,
    userAgent,
    ipAddress,
  });
  await analytics.save();
}

module.exports = {
  collectEvent,
};
