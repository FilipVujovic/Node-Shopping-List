const ApplicationError = require("./ApplicationError");

class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message || "Not found.", 404);
  }
}

module.exports = NotFoundError;
