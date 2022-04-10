const ApplicationError = require("./ApplicationError");

class InvalidInputError extends ApplicationError {
  constructor(message) {
    super(message || "Invalid input", 400);
  }
}

module.exports = InvalidInputError;
