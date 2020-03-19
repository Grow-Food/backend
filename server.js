// import libs/other
const express = require("express"),
  helmet = require("helmet"),
  Cookies = require("cookies");

// import middleware and secrets
const secrets = require("./config/secrets"),
  { setJsonHeaders, initHelmet } = require("./middleware/auth");

// init express server
console.log("environment:", secrets.environment);
const server = express();

// configure cors headers and json
server.use(express.json());
server.use((req, res, next) => setJsonHeaders(req, res, next));
server.use(helmet());

// determine port and start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`SERVER STARTED ON PORT: ${PORT}`));

// * ROUTES *

// auth routes
server.use("/auth", require("./routes/user/auth/auth"));
// user routes
server.use("/user", require("./routes/user/user"));
// index route
server.get("/", (req, res) =>
  res.send({ status: 1, message: "INDEX", data: "" })
);
