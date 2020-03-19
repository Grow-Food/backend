// import libs/other
const jwt = require("jsonwebtoken");

// import secrets
const secrets = require("../config/secrets");

module.exports = {
  generateToken: async (res, givenEmail, tokenType) => {
    const payload = { email: givenEmail };
    const expiration = tokenType == "access" ? "1h" : "7d";

    console.log("generateTokenAndSetCookie called!");

    try {
      // build token and cookie
      return jwt.sign(payload, secrets.jwtSecret, {
        expiresIn: expiration
      });
    } catch (err) {
      const errorObj = {
        data: null,
        message:
          "There was an error generating a token/cookie using your information.",
        error: err
      };
      res.status(500).send(errorObj);
    }
  },
  setBothAuthCookies: (res, refreshToken, accessToken) => {
    const cookies = [
      `GrowFood-accessToken=${accessToken}; HttpOnly`,
      `GrowFood-refreshToken=${refreshToken}; HttpOnly`
    ];

    // set cookie header in response
    return res.setHeader("Set-Cookie", cookies);
  }
};
