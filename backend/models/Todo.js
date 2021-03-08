const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: { type: String, maxlength: 40 },
  completed: Boolean,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", TodoSchema);
