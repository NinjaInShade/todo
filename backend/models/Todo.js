const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: { type: String, maxlength: 20 },
  description: { type: String, maxlength: 150 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", TodoSchema);
