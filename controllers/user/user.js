// import libs/other
const nanoid = require("nanoid"),
  bcrypt = require("bcryptjs");

// import model
const User = require("../../models/User");

// import auth helpers
const authHelpers = require("../../helpers/auth");

module.exports = {
  create: async (req, res) => {
    try {
      // pull props off of request
      const { email, pw, auth_level } = req.body;

      // generate uuid, hash pw
      const id = nanoid();
      const pw_hash = await bcrypt.hashSync(pw, 8);

      // build response object and send response
      const userCreationSuccess = await User.create({
        id,
        email,
        pw_hash,
        auth_level
      });

      if (userCreationSuccess == 1) {
        // generate jwt access and refresh tokens
        await authHelpers.generateToken(res, email, "access");
        await authHelpers.generateToken(res, email, "refresh");

        const successObj = {
          data: { success: userCreationSuccess, accessToken, refreshToken },
          message: "User created successfully!"
        };

        // send success response
        res.status(200).send(successObj);
      }
    } catch (err) {
      const errorObj = {
        data: null,
        message: "There was an error creating a user using your information.",
        error: err
      };
      res.status(500).send(errorObj);
    }
  },
  readSingle: async (req, res) => {
    const userObj = { data: null, message: "read single user endpoint hit!" };
    res.status(200).send(userObj);
  },
  // TODO: dashboard
  fetchDashboard: async (req, res) => {
    // pull props off data
    // fetch data for user dashboard
    // send data to client
  },
  readAll: async (req, res) => {
    try {
      const usersArr = await User.readAll();
      const usersObj = { data: usersArr, message: "Here you go! All users." };
      res.status(200).send(usersObj);
    } catch (err) {
      const errorObj = {
        data: null,
        message: "There was an error fetching all users.",
        error: err
      };
      res.status(500).send(errorObj);
    }
  },
  // TODO: user should be able to update themselves
  update: async (req, res) => {
    const userObj = { data: null, message: "update single user endpoint hit!" };
    res.status(200).send(userObj);
  },
  // TODO: user should be able to delete their account
  delete: async (req, res) => {
    const userObj = { data: null, message: "delete user endpoint hit!" };
    res.status(200).send(userObj);
  }
};
