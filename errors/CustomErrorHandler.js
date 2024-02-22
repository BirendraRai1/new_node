class CustomError extends Error {
  constructor(customError = "Something went wrong.", message, statusCode) {
    super(message);
    this.name = "CustomError";
    this.customError = customError;
    this.statusCode = statusCode;
  }
}

module.exports = { CustomError };
