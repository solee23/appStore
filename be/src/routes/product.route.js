const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/product.controller')

router.route("/create").post(productControllers.createProduct);
router.route("/get").get(productControllers.get);
router.route("/getDetail").get(productControllers.getUserProduct);

module.exports = router;    