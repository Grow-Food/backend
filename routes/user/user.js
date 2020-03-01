const express = require("express");
const router = express.Router();

// import controller
const controller = require('../../controllers/user/user');

// create user
router.post("/signup", controller.create);

// fetch all users
router.get('/all', controller.readAll);

module.exports = router;