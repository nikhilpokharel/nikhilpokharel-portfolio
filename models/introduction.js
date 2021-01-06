const mongoose = require("mongoose");

const Introduction = new mongoose.Schema({
  profileName: {
    type: String,
    required: true,
  },
  profileDescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Homepage-Introduction", Introduction);
