const express = require("express");
const {
  collectEvent,
  getEvents,
} = require("../controllers/analytics.controller");
const { body, param } = require("express-validator");
const validateRequest = require("../middlewares/validateRequest");
const router = express.Router();

const validateAnalyticsQuery = [];

const validateGetAnalytics = [];

router.post(
  "/analytics/collect",
  validateAnalyticsQuery,
  validateRequest,
  collectEvent
);
router.get("/analytics", validateGetAnalytics, validateRequest, getEvents);

module.exports = router;
