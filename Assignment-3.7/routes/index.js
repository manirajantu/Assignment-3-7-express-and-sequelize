// Generate the app routes
const express = require("express");
const app = express();
app.use(express.json());

const protectedRoutes = require("./protectedRoutes");
const generalRoutes = require("./generalRoutes");

app.use(protectedRoutes);
app.use(generalRoutes);

module.exports = app;