// import db stuff
const { queryTypes, sequelizeDB, dbPath } = require("../config/db");

// init db object
const db = new sequelizeDB(dbPath);

const User = {
  create: async ({ id, email, pw_hash, auth_level }) => {
    const createdUser = await db.query(
      'INSERT INTO "Users" ("id", "email", "pw_hash", "auth_level") VALUES (:id, :email, :pw_hash, :auth_level)',
      {
        replacements: {
          id,
          email,
          pw_hash,
          auth_level
        },
        type: queryTypes.INSERT
      }
    );
    // 1 if user was created successfully, 0 if not
    return createdUser[1];
  },
  readSingleByEmail: async email => {
    const foundUser = await db.query(
      'SELECT * FROM "Users" WHERE email = :email LIMIT 1',
      { replacements: { email }, type: queryTypes.SELECT }
    );
    return foundUser[0];
  },
  readSingleById: async id => {
    const foundUser = await db.query(
      'SELECT * FROM "Users" WHERE id = :id LIMIT 1',
      { replacements: { id }, type: queryTypes.SELECT }
    );
    return foundUser[0];
  },
  readAll: async () => {
    return await db.query(`SELECT * FROM "Users"`, { type: queryTypes.SELECT });
  }
};

module.exports = User;
