const express = require("express");
const router = new express.Router();
const shopService = require("../services/shopService");
const errorHandler = require("../middleware/errorHandler");

router.get("/shop", async (req, res) => {
  const result = await shopService.getShops();

  if (result.shopData) {
    return res.status(200).send(result.shopData);
  } else {
    errorHandler(result, req, res);
  }
});

router.get("/shop/:name", async (req, res) => {
  const result = await shopService.getShopsByName(req.params.name);

  if (result.shops) {
    return res.status(200).send(result.shops);
  } else {
    errorHandler(result, req, res);
  }
});

router.post("/shop", async (req, res) => {
  const result = await shopService.addShop(req.body);

  if (result.shop) {
    res.status(201).send({ result });
  } else {
    errorHandler(result, req, res);
  }
});

module.exports = router;
