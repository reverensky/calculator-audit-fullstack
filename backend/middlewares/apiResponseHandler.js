async function sendResponse(res, statusCode, body) {
  return res.status(statusCode).send(body);
}

function formatError(error) {
  return {
    message: error.message || "An unexpected error occurred.",
    statusCode: error.statusCode || 500,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  };
}

async function apiResponseHandler(req, res, servicePromise) {
  try {
    const responseBody = await servicePromise;
    return sendResponse(
      res,
      (responseBody && responseBody.customCode) || 200,
      responseBody.data || responseBody
    );
  } catch (error) {
    const formattedError =
      typeof error.toObject === "function"
        ? error.toObject()
        : formatError(error);

    const statusCode = formattedError.statusCode;
    return sendResponse(res, statusCode, formattedError);
  }
}

module.exports = apiResponseHandler;
