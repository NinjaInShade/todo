// Express imports
const express = require("express");
const router = express.Router();

// Database
const Todo = require("../models/Todo");

// GET - retrieve all todos
router.get("/", async function (req, res, next) {
  try {
    const todos = await Todo.find();
    res.status(202).json({ todos });
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
    res.status(202).json({ todo });
  } catch (err) {
    const error = new Error("Failed to find");
    error.status = 500;
    return next(error);
  }
});

// POST - create new todo
router.post("/", async function (req, res, next) {
  const { title } = req.body;

  if (!title || title.length === 0) {
    return res.status(404).json({
      error: "Cannot be empty",
    });
  }

  const todo = new Todo({
    title,
    completed: false,
  });

  try {
    await todo.save();
  } catch (err) {
    const error = new Error("Failed to save");
    error.status = 500;
    return next(error);
  }

  res.status(202).json({ message: "Todo successfully created!", todo });
});

// PATCH - update a todo by ID
router.patch("/:id", async function (req, res, next) {
  const id = req.params.id;
  const { title, completed } = req.body;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.json({ message: "no todo found" });
    }

    todo.title = title;
    todo.completed = completed;

    await todo.save();

    res.status(202).json({ todo });
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
    res.status(202).json({ message: "successfully deleted" });
  } catch (err) {
    const error = new Error("Failed to save");
    error.status = 500;
    return next(error);
  }
});

module.exports = router;
