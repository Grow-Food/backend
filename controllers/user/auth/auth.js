// import libs/other
const bcrypt = require("bcryptjs");

// import model
const User = require("../../../models/User");

// import auth helpers
const authHelpers = require("../../../helpers/auth");

module.exports = {
  signIn: async (req, res) => {
    try {
      const { pw } = req.body;
      const givenEmail = req.body.email;

      // find user in db by email
      const foundUserResult = await User.readSingleByEmail(givenEmail);

      if (foundUserResult) {
        // compare hashes
        const hashesMatch = await bcrypt.compare(pw, foundUserResult.pw_hash);

        console.log(hashesMatch);

        if (hashesMatch) {
          // generate jwt access and refresh tokens
          const accessToken = authHelpers.generateToken(givenEmail, "access");
          const refreshToken = authHelpers.generateToken(givenEmail, "refresh");

          // pull data from foundUserResult
          const { email, auth_level, id } = foundUserResult;

          res.status(200).send({
            data: {
              email,
              auth_level,
              accessToken,
              refreshToken
            },
            message: `${email} signed in!`
          });
        } else {
          res.status(500).send({
            data: null,
            message:
              "There was a problem signing in with those credentials. Please wait and try again or try again using other credentials.",
            error: "Invalid credentials"
          });
        }
      } else {
        res.status(500).send({
          data: null,
          message:
            "There was no user found with those credentials. Please wait and try again or try again using other credentials.",
          error: "Invalid credentials"
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        data: null,
        message:
          "There was a problem signing in with your credentials. Please wait and try again or try again using other credentials.",
        error: `error: ${err}`
      });
    }
  },
  signOut: async (req, res) => {
    res.status(200).send({ data: null, message: "Signout endpoint hit!" });
  }
};
