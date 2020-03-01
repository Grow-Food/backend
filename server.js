const express = require("express");
const path = require("path");
const cors = require("cors");
const secrets = require("./config/secrets.js");
const db = require("./config/db");


// create express server
console.log("environment:", secrets.environment);
const server = express();

// determine port and start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`SERVER STARTED ON PORT: ${PORT}`));

// configure cors and json
server.use(express.json());
server.use(cors());

// * ROUTES * 

// auth routes
server.use("/auth", require("./routes/auth"));

// index route
server.get("/", (req, res) => res.send({ msg: "INDEX" }));
