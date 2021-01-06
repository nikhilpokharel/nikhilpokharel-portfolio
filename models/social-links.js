const mongoose = require("mongoose");

const SocialLinks = new mongoose.Schema({
  icode: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Social-Media-Links", SocialLinks);
