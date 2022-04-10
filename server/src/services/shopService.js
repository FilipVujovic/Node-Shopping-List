const Shop = require("../db/schemas/shop");
const NotFoundError = require("../errors/NotFoundError");
const InvalidInputError = require("../errors/InvalidInputError");
const sanitizeData = require("../middleware/sanitizeData");

const getShops = async () => {
  try {
    const shopData = await Shop.find();
    if (shopData.length === 0) {
      throw new NotFoundError(`No shops found.`);
    }

    return { status: "success", shopData };
  } catch (error) {
    return error;
  }
};

const getShopsByName = async (shopName) => {
  try {
    const shops = await Shop.find({ name: shopName.toLowerCase() });

    if (shops.length === 0) {
      throw new NotFoundError(`Shop ${shopName} not found.`);
    }

    return { status: "success", shops };
  } catch (error) {
    return error;
  }
};

const addShop = async (shopData) => {
  const shop = new Shop(sanitizeData(shopData));

  try {
    if (Object.keys(shopData).length === 0)
      throw new InvalidInputError("Payload can not be empty");
    await shop.save();
    return { status: "success", shop };
  } catch (error) {
    return error;
  }
};

module.exports = {
  addShop,
  getShops,
  getShopsByName,
};
