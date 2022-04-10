const express = require("express");

const router = new express.Router();
const itemService = require("../services/itemService");
const errorHandler = require("../middleware/errorHandler");

router.get("/item", async (req, res) => {
  const result = await itemService.getItems();
  if (result.itemData) {
    res.status(200).send({ result });
  } else {
    errorHandler(result, req, res);
  }
});

router.get("/item/:name", async (req, res) => {
  const result = await itemService.getItemsByName(req.params.name);
  if (result.item) {
    res.status(200).send({ result });
  } else {
    errorHandler(result, req, res);
  }
});

router.post("/item", async (req, res) => {
  const result = await itemService.addItem(req.body);

  if (result.item) {
    res.status(201).send({ result });
  } else {
    errorHandler(result, req, res);
  }
});

router.patch("/item", async (req, res) => {
  const result = await itemService.updateItem(req.body);

  if (result.item) {
    res.status(200).send({ result });
  } else {
    errorHandler(result, req, res);
  }
});

router.delete("/item/:id", async (req, res) => {
  const result = await itemService.deleteItem(req.params.id);

  if (result.item) {
    res.status(200).send({ result });
  } else {
    errorHandler(result, req, res);
  }
});

module.exports = router;
