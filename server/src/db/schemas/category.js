const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: "Category name is required.",
    trim: true,
    maxLength: [50, "Category length must be less than 50 characters."],
    validate(value) {
      if (!validator.isAlpha(value, ["en-US"], { ignore: " _-" }))
        throw new Error("Category name must contain only (a-zA-Z) letters.");
    },
  },
  description: {
    type: String,
    required: "Category description is required.",
    trim: true,
    minLength: [5, "category description must be at least 5 characters"],
    maxLength: [255, "Category length must be less than 255 characters."],
    validate(value) {
      if (!validator.isAlpha(value, ["en-US"], { ignore: " _-" }))
        throw new Error(
          "Category description must contain only (a-zA-Z) letters."
        );
    },
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
