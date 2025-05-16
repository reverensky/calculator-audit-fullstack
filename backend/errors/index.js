const codes = require("./codes.json");

class ServerError extends Error {
  constructor(errorCode = "CustomError") {
    super(errorCode);

    const errorDetails = codes[errorCode] || {
      customCode: 500,
      message: "Unknown error",
    };
    this.statusCode = errorDetails.customCode;
    this.message = errorDetails.message;
    this.errors = errorCode;
  }

  toObject() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
    };
  }
}

module.exports = ServerError;
