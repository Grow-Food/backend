const Sequelize = require("sequelize");
const db = require("../config/db");

const User = db.define("Users", {
  email: {
    type: Sequelize.STRING
  },
  pw_hash: {
    type: Sequelize.STRING
  },
  is_superuser: {
    type: Sequelize.BOOLEAN
  },
  auth_level: {
    type: Sequelize.INTEGER
  }
});

module.exports = User;
