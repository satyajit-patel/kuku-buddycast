const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
  userId: String,
  date: String,
  audioUrl: String,
  script: String
})
module.exports = mongoose.model("Podcast", Schema)
