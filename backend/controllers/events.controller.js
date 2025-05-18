const {
  processCollectEvent,
  processGetEvents,
} = require("../services/events.service");
const apiResponseHandler = require("../middlewares/apiResponseHandler");

async function collectEvent(req, res) {
  const { action, value, session_id  } = req.query;

  const collectEventPromise = processCollectEvent(action, value, session_id);
  return apiResponseHandler(req, res, collectEventPromise);
}

async function getEvents(req, res) {
  const { offset = 0, limit = 10, session_id } = req.query;
  
  const getEventsPromise = processGetEvents(offset, limit, session_id);
  return apiResponseHandler(req, res, getEventsPromise);
}

module.exports = {
  collectEvent,
  getEvents,
};
