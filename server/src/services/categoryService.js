const Category = require("../db/schemas/category");
const NotFoundError = require("../errors/NotFoundError");
const InvalidInputError = require("../errors/InvalidInputError");
const sanitizeData = require("../middleware/sanitizeData");

const getCategories = async () => {
  try {
    const categoryData = await Category.find();

    if (categoryData.length === 0) {
      throw new NotFoundError(`No categories found.`);
    }

    return { status: "success", categoryData };
  } catch (error) {
    return error;
  }
};

const getCategoryByName = async (categoryName) => {
  try {
    const category = await Category.find({ name: categoryName.toLowerCase() });
    if (category.length === 0) {
      throw new NotFoundError(`Category ${categoryName} not found.`);
    }

    return { status: "success", category };
  } catch (error) {
    return error;
  }
};

const addCategory = async (categoryData) => {
  const category = new Category(sanitizeData(categoryData));

  try {
    if (Object.keys(categoryData).length === 0)
      throw new InvalidInputError("Payload can not be empty");

    await category.save();
    return { status: "success", category };
  } catch (error) {
    return error;
  }
};

module.exports = {
  getCategories,
  addCategory,
  getCategoryByName,
};
