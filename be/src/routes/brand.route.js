const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken');



router.route("/").post([verifyAccessToken,isAdmin],brandController.createBrand);
router.route("/get").get(brandController.getBrand);
router.route("/:brid").put([verifyAccessToken,isAdmin],brandController.updateBrand);
router.route("/:brid").delete([verifyAccessToken,isAdmin],brandController.deleteBrand);





module.exports = router;    