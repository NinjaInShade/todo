// Setting up express and other middleware
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
// Setting up mongoose
const mongoose = require("mongoose");
// Controllers
const TodoController = require("./controllers/TodoController");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Route forwarding
app.use("/api/todos", TodoController);

// Unmatched routes (throws error)
app.use(function (req, res, next) {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

// Error handler
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

// Mongoose Connection
mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function () {
    // PORT
    app.listen(process.env.PORT || 4200);
    console.log("mongoose connected");
    console.log(`Server running on port ${process.env.PORT || 4200}`);
  })
  .catch(function (error) {
    console.log(error);
  });
