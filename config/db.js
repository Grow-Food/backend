// import libs/other
const Sequelize = require("sequelize");
const { QueryTypes } = Sequelize;

// assign db path
const dbPath = "postgres://Louie:''@localhost:4747/growfooddb";

module.exports = {
  sequelizeDB: Sequelize,
  queryTypes: QueryTypes,
  dbPath
};
