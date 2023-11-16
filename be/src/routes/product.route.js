const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken');

router.route("/create").post([verifyAccessToken,isAdmin],productController.createProduct);
router.route("/get").get(productController.get);

router.route("/:pid").get(productController.getById);
router.route("/:pid").put([verifyAccessToken,isAdmin],productController.updateById);
router.route("/:pid").delete([verifyAccessToken,isAdmin],productController.deleteProduct);




module.exports = router;    