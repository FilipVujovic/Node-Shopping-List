const ApplicationError = require("./ApplicationError");

class InvalidObjectIdError extends ApplicationError {
  constructor(message) {
    super(message || "Object Id does not exist in the database.", 400);
  }
}

module.exports = InvalidObjectIdError;
