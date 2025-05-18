const express = require("express");
const { collectEvent, getEvents } = require("../controllers/events.controller");
const { body, param } = require("express-validator");
const validateRequest = require("../middlewares/validateRequest");
const router = express.Router();

const validateAnalyticsQuery = [];

const validateGetAnalytics = [];

router.post("", validateAnalyticsQuery, validateRequest, collectEvent);
router.get("", validateGetAnalytics, validateRequest, getEvents);

module.exports = router;
