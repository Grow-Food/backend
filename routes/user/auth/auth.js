const express = require("express");
const router = express.Router();
const db = require("../../../config/db");

// sign in
router.get("/signin", async (req, res) => {
  res.status(200).send({data: req, message: 'Signin endpoint hit!'});
});

// sign out
router.get("/signout", async (req, res) => {
  res.status(200).send({data: req, message: 'Signout endpoint hit!'});
});

module.exports = router;
