const express = require("express");
const secrets = require("./config/secrets");
var bodyParser = require("body-parser");

// create express server
console.log("environment:", secrets.environment);
const server = express();

// configure cors and json
server.use(express.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');
  next();
});

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