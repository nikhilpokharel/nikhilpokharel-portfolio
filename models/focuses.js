const mongoose = require("mongoose");

const Focuses = new mongoose.Schema({
  titleOne: {
    type: String,
    required: true,
  },
  descriptionOne: {
    type: String,
    required: true,
  },
  titleTwo: {
    type: String,
    required: true,
  },
  descriptionTwo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Frontend/Backend_Focuses", Focuses);
