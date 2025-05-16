const { validationResult } = require("express-validator");

function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res.status(400).json({
      code: "VALIDATION_ERROR",
      message: "Request validation failed",
      details: formattedErrors,
    });
  }

  next();
}

module.exports = validateRequest;
