const express = require("express");
const app = express();
app.use(express.json()); // Enable express to parse JSON as request body.
const protectedRoutes = require("./protected.routes");
const generalRoutes = require("./general.routes");

app.use(protectedRoutes);
app.use(generalRoutes);

module.exports = app;