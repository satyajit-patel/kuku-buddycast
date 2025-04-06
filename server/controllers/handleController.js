const Preference = require("../models/UserPreference");
const Podcast = require("../models/Podcast");

// Get today's podcast for a user
const getPodcast = async (req, res) => {
  const today = new Date().toDateString()
  try {
    console.log("welcome to get podcast");
    console.log(req.params.id, today);
    const episode = await Podcast.findOne({ userId: req.params.id, date: today })
    if (!episode) return res.status(404).json({ error: "Podcast not found" })
    res.json(episode)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch podcast" })
  }
}

// Get preference by userId
const getPreference = async (req, res) => {
  try {
    const pref = await Preference.findOne({ userId: req.params.id })
    res.json(pref)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch preferences" })
  }
}

// Create or update preferences
const updatePreference = async (req, res) => {
  const { userId, topics, duration } = req.body;
  console.log(userId, topics, duration);
  try {
    const updated = await Preference.findOneAndUpdate(
      { userId },
      { userId, duration, topics },
      { upsert: true, new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: "Failed to update preferences" })
  }
}

module.exports = {
  getPodcast,
  getPreference,
  updatePreference,
}
