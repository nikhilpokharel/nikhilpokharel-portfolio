const mongoose = require("mongoose");

const Skills = new mongoose.Schema({
  skillTitle: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  imageId: {
    type: String,
    required: true,
  },
  skillList: {
    type: Array,
    required: true,
  },
  skillLink: {
    type: Array,
  },
});

module.exports = mongoose.model("Development_Skills", Skills);
