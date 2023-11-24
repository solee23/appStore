const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken');

router.route("/create").post([verifyAccessToken], orderController.createOrder);
router.route("/:oid").put([verifyAccessToken, isAdmin], orderController.updateStatus);

router.route("/user").get([verifyAccessToken], orderController.getUserStatus);

router.route("/admin").get([verifyAccessToken, isAdmin], orderController.getUserStatus);





module.exports = router;    