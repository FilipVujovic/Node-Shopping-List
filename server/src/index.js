const express = require("express");
require("./db/mongoose");

const shopRouter = require("./routers/shopRouter");
const categoryRouter = require("./routers/categoryRouter");
const itemRouter = require("./routers/itemRouter");
const listRouter = require("./routers/listRouter");
const app = express();

app.use(express.json());

app.use(shopRouter);
app.use(categoryRouter);
app.use(itemRouter);
app.use(listRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT}.`);
});
