module.exports = app => {
  const brands = require("../controllers/brand.controller.js");

  var router = require("express").Router();

  router.post('/', brands.fetchAndSave);

  app.use('/api/brands', router);
};
