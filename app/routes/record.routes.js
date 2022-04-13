module.exports = app => {
  const records = require("../controllers/record.controller.js");

  var router = require("express").Router();

  // Retrieve a set of records based on filters
  router.post("/", records.filter);

  app.use("/api/record", router);
};
