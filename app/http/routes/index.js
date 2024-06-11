const express = require("express");
const userRoutes = require("@routes/userRoutes");
const groupRoutes = require("@routes/groupRoutes");
const messageRoutes = require("@routes/messageRoutes");

const app = express();

// Routes
app.use("/users", userRoutes);
app.use("/groups", groupRoutes);
app.use("/messages", messageRoutes);

module.exports = app;
