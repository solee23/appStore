const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken');



router.route("/").post([verifyAccessToken,isAdmin],categoryController.createCategory);
router.route("/get").get(categoryController.getCategory);
router.route("/:cid").put([verifyAccessToken,isAdmin],categoryController.updateCategory);
router.route("/:cid").delete([verifyAccessToken,isAdmin],categoryController.deleteCategory);







module.exports = router;    