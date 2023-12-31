const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary')

router.route("/ratings").put(verifyAccessToken,productController.ratings);

router.route("/create").post([verifyAccessToken,isAdmin],productController.createProduct);

router.route("/get").get(productController.get);

router.route("/:pid").get(productController.getById);
router.route("/:pid").put([verifyAccessToken,isAdmin],productController.updateById);
router.route("/:pid").delete([verifyAccessToken,isAdmin],productController.deleteProduct);

router.route("/upload/:pid").put([verifyAccessToken,isAdmin], uploader.array('images', 10), productController.uploadImage);







module.exports = router;    