const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken');

router.route("/").post(categoryController.createCategory);

router.route("/get").get(categoryController.getCategory);

// router.route("/:pid").get(productController.getById);
// router.route("/:pid").put([verifyAccessToken,isAdmin],productController.updateById);
// router.route("/:pid").delete([verifyAccessToken,isAdmin],productController.deleteProduct);






module.exports = router;    