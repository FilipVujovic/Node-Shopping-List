const mongoose = require("mongoose");
const Category = require("./category");
const InvalidInputError = require("../../errors/InvalidInputError");
const InvalidObjectIdError = require("../../errors/InvalidObjectIdError");
const validator = require("validator");

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Item name is required.",
      trim: true,
      validate(value) {
        if (!validator.isAlpha(value, ["en-US"], { ignore: " _-" }))
          throw new Error("Item name must contain only (a-zA-Z) letters.");
      },
    },
    quantity: {
      type: Number,
      default: 1,
      required: "Quantity is required.",
      validate(value) {
        if (value < 0)
          throw new InvalidInputError("Quantity must be greater than 0.");
      },
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      async validate(value) {
        const category = await Category.findById(value);
        if (!category) {
          throw new InvalidObjectIdError();
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
