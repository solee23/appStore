const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon.controller');
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken');



router.route("/").post([verifyAccessToken,isAdmin],couponController.createCoupon);
router.route("/get").get(couponController.getCoupon);
router.route("/:cid").put([verifyAccessToken,isAdmin],couponController.updateCoupon);
router.route("/:cid").delete([verifyAccessToken,isAdmin],couponController.deleteCoupon);





module.exports = router;    