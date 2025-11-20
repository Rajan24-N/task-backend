const express = require("express");
const app = express();
require('dotenv').config()

const taskRoutes = require("./src/routes/taskRoute");

app.use(express.json());

// Register routes
app.use("/tasks", taskRoutes);

module.exports = app;
