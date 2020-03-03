// import libs/other
const bcrypt = require("bcryptjs");

// import model
const User = require("../../../models/User");

module.exports = {
  signIn: async (req, res) => {
    try {
      const { email, pw } = req.body;

      // find user in db by email
      const foundUserResult = await User.readSingleByEmail(email);

      console.log(foundUserResult);

      if (foundUserResult) {
        // compare hashes
        const hashesMatch = await bcrypt.compare(pw, foundUserResult.pw_hash);

        console.log(hashesMatch);

        if (hashesMatch) {
          // TODO: generate jwt access and refresh tokens

          res.status(200).send({
            data: foundUserResult,
            message: `${foundUserResult.email} signed in!`
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
