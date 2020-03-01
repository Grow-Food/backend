// secrets, keys, etc go in here
module.exports = {
  jwtSecret: process.env.JWT_SECRET || "keep it secret keep it safe",
  environment: process.env.DB_ENV || process.env.NODE_ENV || "development"
};
