const secrets = require("../config/secrets");
const jwt = require("jsonwebtoken");

const generateToken = (givenEmail, tokenType) => {
  const payload = { email: givenEmail };
  const expiration = tokenType == "access" ? "1h" : "7d";
  return jwt.sign(payload, secrets.jwtSecret, { expiresIn: expiration });
};

module.exports = { generateToken };
