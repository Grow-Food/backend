// import libs/other
const nanoid = require('nanoid');

// import models
const User = require('../../models/User');

module.exports = {
  create: async (req, res) => {
    try {
      // pull props off of request and generate uuid
      const {email, pw_hash, auth_level} = req.body;
      const id = nanoid();

      // build response object and send response
      const userObj = await User.create({id, email, pw_hash, auth_level});
      res.status(200).send(userObj);

    } catch (err) {
      const errorObj = {data: null, message: 'There was an error creating a user using your information.', error: err};
      res.status(500).send(errorObj);
    }
  },
  readSingle: async (req, res) => {
    console.log(req.body);
    const userObj = {data: null, message: 'read single user endpoint hit!'};
    res.status(200).send(userObj);
  },
  readAll: async (req, res) => {
    try {
      const usersArr = await User.findAll();
      res.status(200).send({data: usersArr, message: 'Here you go! All users.'});
  
    } catch (err) {
      const errorObj = {data: null, message: 'There was an error fetching all users.', error: err};
      res.status(500).send(errorObj);
    }
  },
  update: async (req, res) => {
    const userObj = {data: null, message: 'update single user endpoint hit!'};
    res.status(200).send(userObj);
  },
  delete: async (req, res) => {
    const userObj = {data: null, message: 'delete user endpoint hit!'};
    res.status(200).send(userObj);
  }
};