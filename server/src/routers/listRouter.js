const express = require("express");

const router = new express.Router();
const listService = require("../services/listService");
const errorHandler = require("../middleware/errorHandler");

router.get("/list", async (req, res) => {
  const result = await listService.getLists();

  if (result.listData) {
    res.status(200).send({ result });
  } else {
    errorHandler(result, req, res);
  }
});

router.get("/list/:name", async (req, res) => {
  const result = await listService.getListByName(req.params.name);

  if (result.list) {
    res.status(200).send({ result });
  } else {
    errorHandler(result, req, res);
  }
});

router.post("/list", async (req, res) => {
  const result = await listService.addList(req.body);

  if (result.list) {
    res.status(201).send({ result });
  } else {
    errorHandler(result, req, res);
  }
});

module.exports = router;
