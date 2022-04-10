const Item = require("../db/schemas/item");
const NotFoundError = require("../errors/NotFoundError");
const InvalidInputError = require("../errors/InvalidInputError");
const sanitizeData = require("../middleware/sanitizeData");

const getItems = async () => {
  try {
    const itemData = await Item.find().populate("category");

    if (itemData.length === 0) {
      throw new NotFoundError(`No items found.`);
    }

    return { status: "success", itemData };
  } catch (error) {
    return error;
  }
};

const getItemsByName = async (itemName) => {
  try {
    const item = await Item.find({ name: itemName.toLowerCase() }).populate(
      "category"
    );

    if (item.length === 0) {
      throw new NotFoundError(`Item ${itemName} not found.`);
    }

    return { status: "success", item };
  } catch (error) {
    return error;
  }
};

const addItem = async (itemData) => {
  const item = new Item(sanitizeData(itemData));

  try {
    if (Object.keys(itemData).length === 0)
      throw new InvalidInputError("Payload can not be empty");
    await item.save();
    return { status: "success", item };
  } catch (error) {
    return error;
  }
};

const updateItem = async (itemData) => {
  const updates = Object.keys(itemData);
  try {
    if (Object.keys(itemData).length === 0)
      throw new InvalidInputError("Payload can not be empty");

    const item = await Item.findOne({ _id: itemData._id });

    if (!item) throw new NotFoundError(`Item not found.`);

    updates.forEach((update) => (item[update] = itemData[update]));
    await item.save();
    return { status: "success", item };
  } catch (error) {
    return error;
  }
};

const deleteItem = async (itemId) => {
  try {
    const item = await Item.findOneAndDelete({ _id: itemId });

    if (!item) throw new NotFoundError(`Item not found.`);

    return { status: "success", item };
  } catch (error) {
    return error;
  }
};

module.exports = {
  addItem,
  getItems,
  getItemsByName,
  updateItem,
  deleteItem,
};
