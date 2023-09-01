const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(routes);

mongoose.connect("mongodb://localhost/jest", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = app;
