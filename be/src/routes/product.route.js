const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
// const {verifyAccessToken} = require('../middlewares/verifyToken');

router.route("/create").post(productController.createProduct);
router.route("/get").get(productController.get);

router.route("/:pid").get(productController.getById);
router.route("/:pid").put(productController.updateById);
router.route("/:pid").delete(productController.deleteProduct);




module.exports = router;    