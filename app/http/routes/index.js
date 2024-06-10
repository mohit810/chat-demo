const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("@routes/userRoutes");
const groupRoutes = require("@routes/groupRoutes");
const messageRoutes = require("@routes/messageRoutes");

const app = express();
const port = process.env.port || 8080;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/messages", messageRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
