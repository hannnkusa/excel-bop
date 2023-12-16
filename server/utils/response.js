// Function to send a success response
function sendSuccess(res, statusCode, data) {
  res.status(statusCode).json({
    success: true,
    data: data,
  });
}

// Function to send an error response
function sendError(res, statusCode, message) {
  res.status(statusCode).json({
    success: false,
    error: {
      code: statusCode,
      message: message,
    },
  });
}

module.exports = {
  sendSuccess: sendSuccess,
  sendError: sendError,
};
