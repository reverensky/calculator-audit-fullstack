const express = require("express");
const { collectEvent, getEvents } = require("../controllers/events.controller");
const { allowedActions } = require("../config/events.json");
const validateRequest = require("../middlewares/validateRequest");
const { query } = require("express-validator");
const router = express.Router();

const validateCollectEventQuery = [
  query("action")
    .isString()
    .withMessage("action must be a string")
    .notEmpty()
    .withMessage("action is required")
    .isIn(allowedActions)
    .withMessage(`action must be one of: ${allowedActions.join(", ")}`),
  query("value")
    .isString()
    .withMessage("value must be a string")
    .notEmpty()
    .withMessage("value is required"),
];

const validateGetEvents = [
  query("offset")
    .default(0)
    .isInt({ min: 0 })
    .withMessage("Offset must be a positive number or zero"),
  query("limit")
    .default(10)
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive number"),
];

router.post("", validateCollectEventQuery, validateRequest, collectEvent);
router.get("", validateGetEvents, validateRequest, getEvents);

module.exports = router;
