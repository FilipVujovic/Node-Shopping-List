const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/ListManagement?authSource=admin`)
  .catch((error) => console.error(error));

mongoose.connection.on("connected", () => {
  console.log(
    `Connected to database. Connection status : ${mongoose.connection.readyState}`
  );
});
