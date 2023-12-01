const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');
const {verifyAccessToken} = require('../middlewares/verifyToken');


router.route("/register").post(userControllers.register);
router.route("/final-register/:token").get(userControllers.finalRegister);

router.route('/login').post(userControllers.login)
router.route("/get").get(verifyAccessToken,userControllers.getOne);
router.route("/refreshToken").post(userControllers.refreshAccesstoken);
router.route("/logout").post(userControllers.logout);

router.route("/forgotPassword").post(userControllers.forgotPassword);
router.route("/resetPassWord").put(userControllers.resetPassWord);

router.route("/updateAddress").put(verifyAccessToken,userControllers.updateAddress);

router.route("/updateCart").put(verifyAccessToken,userControllers.updateCart);




module.exports = router;    