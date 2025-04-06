const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  userId: String,
  topics: {
    type: [String],
    default: ["AI"],
  },
  duration: {
    type: Number,
    default: 5,
  }
});

module.exports = mongoose.model("UserPreference", Schema);
