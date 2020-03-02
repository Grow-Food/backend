const secrets = require("../../config/secrets");
const jwt = require("jsonwebtoken");

const generateToken = (email, tokenType) => {
  const payload = { email };
  const expiration = tokenType == "access" ? "1h" : "7d";
  return jwt.sign(payload, secrets.jwtSecret, { expiresIn: expiration });
};

module.exports = { generateToken };
