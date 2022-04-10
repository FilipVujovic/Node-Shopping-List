const mongoose = require("mongoose");
const NotFoundError = require("../errors/NotFoundError");
const InvalidInputError = require("../errors/InvalidInputError");

const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).send(error.message);
  } else if (error instanceof NotFoundError) {
    res.status(error.status).send(error.message);
  } else if (error instanceof InvalidInputError) {
    res.status(error.status).send(error.message);
  } else {
    res.status(500).send(`Something went wrong. Please try again.`);
  }
};

module.exports = errorHandler;
