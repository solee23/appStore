const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken');



router.route("/").post([verifyAccessToken,isAdmin],blogController.createBlog);
router.route("/like").post([verifyAccessToken],blogController.likeBlog);
router.route("/dislike").post([verifyAccessToken],blogController.dislikeBlog);



router.route("/get").get(blogController.getAllBlog);

router.route("/:bid").put([verifyAccessToken,isAdmin],blogController.updateBlog);
// router.route("/:cid").delete([verifyAccessToken,isAdmin],categoryController.deleteCategory);







module.exports = router;    