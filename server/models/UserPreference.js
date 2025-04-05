const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
  userId: String,
  topics: [String],
  duration: Number
})
module.exports = mongoose.model("UserPreference", Schema)
