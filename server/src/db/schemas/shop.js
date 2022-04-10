const mongoose = require("mongoose");
const validator = require("validator");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Shop name is required",
    maxlength: [30, "Shop name must be less than 30 characters."],
    trim: true,
    validate(value) {
      if (!validator.isAlpha(value, ["en-US"], { ignore: " _-" }))
        throw new Error("Shop name must contain only (a-zA-Z) letters.");
    },
  },
  address: {
    type: String,
    required: "Address is required",
    maxlength: [30, "Address must be less than 30 characters"],
    trim: true,
    validate(value) {
      if (!validator.isAlphanumeric(value, ["en-US"], { ignore: " _-" })) {
        throw new Error("Addres must be alphanumeric");
      }
    },
  },
  city: {
    type: String,
    required: "City is required",
    maxlength: [30, "City must be less than 30 characters"],
    trim: true,
    validate(value) {
      if (!validator.isAlpha(value, ["en-US"], { ignore: " _-" }))
        throw new Error("Shop city must contain only (a-zA-Z) letters.");
    },
  },
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
