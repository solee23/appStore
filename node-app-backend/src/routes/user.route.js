const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');

router.route("/create").post(userControllers.createUser);
router.route("/get").get(userControllers.getAll);


module.exports = router;    