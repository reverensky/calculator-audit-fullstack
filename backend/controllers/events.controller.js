const {
  processCollectEvent,
  processGetEvents,
} = require("../services/events.service");
const apiResponseHandler = require("../middlewares/apiResponseHandler");

async function collectEvent(req, res) {
  const { action, value } = req.query;

  const collectEventPromise = processCollectEvent(action, value);
  return apiResponseHandler(req, res, collectEventPromise);
}

async function getEvents(req, res) {
  const { offset = 0, limit = 10 } = req.query;
  
  const getEventsPromise = processGetEvents(offset, limit);
  return apiResponseHandler(req, res, getEventsPromise);
}

module.exports = {
  collectEvent,
  getEvents,
};
