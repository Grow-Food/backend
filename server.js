const express = require("express");
const secrets = require("./config/secrets");

// import universal cors header helper
const corsHeader = require("./helpers/header");

// create express server
console.log("environment:", secrets.environment);
const server = express();

// configure cors and json
server.use(express.json());
server.use((req, res, next) => corsHeader.header(req, res, next))

// determine port and start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`SERVER STARTED ON PORT: ${PORT}`));

// * ROUTES * 

// auth routes
server.use("/auth", require("./routes/user/auth/auth"));
// user routes
server.use("/user", require('./routes/user/user.js'));
// index route
server.get("/", (req, res) => res.send({ msg: "INDEX" }));

// // db test
// db.authenticate();