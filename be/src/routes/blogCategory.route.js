const express = require('express');
const router = express.Router();
const blogCategoryController = require('../controllers/blogCategory.controller');
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken');



router.route("/").post([verifyAccessToken,isAdmin],blogCategoryController.createBlogCategory);
router.route("/get").get(blogCategoryController.getBlogCategory);
router.route("/:bcid").put([verifyAccessToken,isAdmin],blogCategoryController.updateBlogCategory);
router.route("/:bcid").delete([verifyAccessToken,isAdmin],blogCategoryController.deleteBlogCategory);







module.exports = router;    