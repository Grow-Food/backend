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
      const foundUserResult = await User.readSingleBy("email", givenEmail);

      if (foundUserResult) {
        // compare hashes
        const hashesMatch = await bcrypt.compare(pw, foundUserResult.pw_hash);

        if (hashesMatch) {
          // generate jwt access and refresh tokens, set auth cookies
          const accessToken = await authHelpers.generateToken(
            res,
            givenEmail,
            "access"
          );
          const refreshToken = await authHelpers.generateToken(
            res,
            givenEmail,
            "refresh"
          );

          authHelpers.setBothAuthCookies(res, accessToken, refreshToken);

          // pull data from foundUserResult
          const { email, auth_level } = foundUserResult;

          res.status(200).send({
            data: {
              email,
              auth_level
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
