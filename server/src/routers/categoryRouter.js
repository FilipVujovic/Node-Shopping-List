const express = require("express");
const router = new express.Router();

const categoryService = require("../services/categoryService");
const errorHandler = require("../middleware/errorHandler");

router.get("/category", async (req, res) => {
  const result = await categoryService.getCategories();

  if (result.categoryData) {
    return res.status(200).send(result.categoryData);
  } else {
    errorHandler(result, req, res);
  }
});

router.get("/category/:name", async (req, res) => {
  const result = await categoryService.getCategoryByName(req.params.name);

  if (result.category) {
    return res.status(200).send(result.category);
  } else {
    errorHandler(result, req, res);
  }
});

router.post("/category", async (req, res) => {
  const result = await categoryService.addCategory(req.body);

  if (result.category) {
    return res.status(201).send({ result });
  } else {
    errorHandler(result, req, res);
  }
});

module.exports = router;
