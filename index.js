require("module-alias/register");
const express = require("express");
const bodyParser = require("body-parser");
const api = require("@routes");
const app = express();

const db = require("@modules/db").connection();
const port = process.env.port || 8080;

// Middleware
app.use(bodyParser.json());

// routing set up
app.use("/api", api);

var server = app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});

//const app = require("@routes");

module.exports = server;
