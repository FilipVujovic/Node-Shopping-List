const List = require("../db/schemas/list");
const NotFoundError = require("../errors/NotFoundError");
const InvalidInputError = require("../errors/InvalidInputError");
const sanitizeData = require("../middleware/sanitizeData");

const getLists = async () => {
  try {
    const listData = await List.find().populate("items").populate("shop");

    if (listData.length === 0) {
      throw new NotFoundError(`No lists found`);
    }

    return { status: "success", listData };
  } catch (error) {
    return error;
  }
};

const getListByName = async (listName) => {
  try {
    const list = await List.find({ name: listName.toLowerCase() })
      .populate("items")
      .populate("shop");
    if (list.length === 0) {
      throw new NotFoundError(`No ${listName} list found.`);
    }

    return { status: "success", list };
  } catch (error) {
    return error;
  }
};

const addList = async (listData) => {
  listData.name = listData.name.toLowerCase();

  const list = new List(listData);

  try {
    if (Object.keys(listData).length === 0)
      throw new InvalidInputError("Payload can not be empty");
    await list.save();
    return { status: "success", list };
  } catch (error) {
    return error;
  }
};

module.exports = {
  addList,
  getLists,
  getListByName,
};
