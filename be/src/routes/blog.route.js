const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken');



router.route("/").post([verifyAccessToken,isAdmin],blogController.createBlog);
router.route("/like/:bid").post([verifyAccessToken],blogController.likeBlog);
router.route("/dislike/:bid").post([verifyAccessToken],blogController.dislikeBlog);



router.route("/get").get(blogController.getAllBlog);
router.route("/get/:bid").get(blogController.getBlog);


router.route("/:bid").put([verifyAccessToken,isAdmin],blogController.updateBlog);
router.route("/:bid").delete([verifyAccessToken,isAdmin],blogController.deleteBlog);







module.exports = router;    