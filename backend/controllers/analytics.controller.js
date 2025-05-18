const {
  collectAnalyticsEvent,
  getAnalyticsEvents,
} = require("../services/analytics.service");
const apiResponseHandler = require("../middlewares/apiResponseHandler");

async function collectEvent(req, res) {
  const collectEventPromise = collectAnalyticsEvent();
  return apiResponseHandler(req, res, collectEventPromise);
}

async function getEvents(req, res) {
  const getEventsPromise = getAnalyticsEvents();
  return apiResponseHandler(req, res, getEventsPromise);
}

module.exports = {
  collectEvent,
  getEvents,
};
