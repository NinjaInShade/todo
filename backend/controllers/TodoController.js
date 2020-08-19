// Express imports
const express = require("express");
const router = express.Router();

// Database
const Todo = require("../models/Todo");

// GET - retrieve all todos
router.get("/", async function (req, res, next) {
  try {
    const todos = await Todo.find();
    res.json({ todos });
  } catch (err) {
    const error = new Error("Failed to find");
    error.status = 500;
    return next(error);
  }
});

// GET - retrieve specific todo by id
router.get("/:id", async function (req, res, next) {
  const id = req.params.id;

  try {
    const todo = await Todo.findById(id);
    res.json({ todo });
  } catch (err) {
    const error = new Error("Failed to find");
    error.status = 500;
    return next(error);
  }
});

// POST - create new todo
router.post("/", async function (req, res, next) {
  const { title, description } = req.body;
  const todo = new Todo({
    title,
    description,
  });

  try {
    await todo.save();
  } catch (err) {
    const error = new Error("Failed to save");
    error.status = 500;
    return next(error);
  }

  res.status(202).json({ message: "Todo successfully created!" });
});

// PATCH - update a todo by ID
router.patch("/:id", async function (req, res, next) {
  const id = req.params.id;
  const { title, description } = req.body;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      res.json({ message: "no todo found" });
    }

    if (title) {
      todo.title = title;
    }
    if (description) {
      todo.description = description;
    }

    await todo.save();
    res.json({ todo });
  } catch (err) {
    const error = new Error("Failed to find");
    error.status = 500;
    return next(error);
  }
});

// Delete - delete a todo by ID
router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;

  try {
    await Todo.deleteOne({ _id: id });
    res.json({ message: "successfully deleted" });
  } catch (err) {
    const error = new Error("Failed to save");
    error.status = 500;
    return next(error);
  }
});

module.exports = router;
