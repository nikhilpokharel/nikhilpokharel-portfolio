const mongoose = require("mongoose");

const Projects = new mongoose.Schema({
  profilePic: {
    type: String,
    required: true,
  },
  imageId: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  projectLink: {
    type: String,
    required: true,
  },
  projectDemo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  loveCounter: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Projects", Projects);
