const mongoose = require("mongoose");

const About = new mongoose.Schema({
  profilePic: {
    type: String,
    required: true,
  },
  imageId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("About_Introduction", About);
