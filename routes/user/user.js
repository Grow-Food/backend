const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const User = require('../../models/User');

// import controller
const controller = require('../../controllers/user/user');

//  create user
router.get("/signup", controller.create);

// fetch all users
router.get('/all', controller.readAll);

module.exports = router;