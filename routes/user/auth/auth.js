const express = require("express");
const router = express.Router();
const db = require("../../../config/db");

// import controller
const controller = require("../../../controllers/user/auth/auth");

// sign in
router.post("/signin", controller.signIn);

// sign out
router.post("/signout", controller.signOut);

module.exports = router;
