const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const {verifyAccessToken} = require('../middlewares/verifyToken');

router.route("/create").post([verifyAccessToken], orderController.createOrder);

module.exports = router;    