const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const User = require('../../models/User');

//  create user
router.get("/signup", async (req, res) => {
  res.status(200).send({data: req, message: 'Signup endpoint hit!'});
});

// fetch all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users);
    res.status(200).send(users);

  } catch (err) {
    const errorObj = {data: "", message: 'There was an error fetching all users.', error: err};
    res.status(500).send(errorObj);
  }
});

module.exports = router;