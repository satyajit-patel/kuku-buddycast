const cron = require("node-cron")
const Preference = require("../models/UserPreference")
const Podcast = require("../models/Podcast")
const generatePodcastScript = require("../services/generatePodcast")

const generateDailyPodcast = cron.schedule("0 8 * * *", async () => {
  const users = await Preference.find()

  for (const user of users) {
    const script = await generatePodcastScript(user.topics, user.duration)
    const fakeAudioUrl = "https://example.com/audio/" + Date.now() + ".mp3"

    await Podcast.create({
      userId: user.userId,
      date: new Date().toDateString(),
      audioUrl: fakeAudioUrl,
      script: script
    })
  }

  console.log("Daily podcasts generated")
})

module.exports = generateDailyPodcast
