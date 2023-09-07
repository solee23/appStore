const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');

router.route("/register").post(userControllers.register);
router.route('/login').post(userControllers.login)
router.route("/get").get(userControllers.getAll);


module.exports = router;    