const ObjectId = require("mongodb").ObjectId;
const sanitizeData = (data) => {
  let newObj = {};
  for (key in data) {
    if (!ObjectId.isValid(data[key])) {
      newObj[key] = data[key].toLowerCase();
    } else {
      newObj[key] = data[key];
    }
  }
  return newObj;
};

module.exports = sanitizeData;
