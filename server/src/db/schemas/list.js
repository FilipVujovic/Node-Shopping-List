const mongoose = require("mongoose");
const Item = require("./item");
const Shop = require("./shop");
const InvalidObjectIdError = require("../../errors/InvalidObjectIdError");
const validator = require("validator");

const listSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "List name is required",
      trim: true,
      validate(value) {
        if (!validator.isAlpha(value, ["en-US"], { ignore: " _-" }))
          throw new Error("List name must contain only (a-zA-Z) letters.");
      },
    },
    items: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Item",
        async validate(value) {
          const item = await Item.findById(value);
          if (!item) {
            throw new InvalidObjectIdError();
          }
        },
      },
    ],
    shop: {
      type: mongoose.Schema.ObjectId,
      ref: "Shop",
      async validate(value) {
        const shop = await Shop.findById(value);
        if (!shop) {
          throw new InvalidObjectIdError();
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);

module.exports = List;
