const mongoose = require("mongoose");

const userMessage = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user_feedback", userMessage);
