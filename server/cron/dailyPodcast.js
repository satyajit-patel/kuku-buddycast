const cron = require("node-cron")
const Preference = require("../models/UserPreference")
const Podcast = require("../models/Podcast")
const generatePodcastScript = require("../services/generatePodcast")
const {tts} = require("../services/deepgram")

// 🎯 Podcast generation function
const generateDailyPodcast = async () => {
  console.log("🎙️ Generating podcasts...");
  const users = await Preference.find();

  for (const user of users) {
    const script = await generatePodcastScript(user.topics, user.duration);
    const audioUrl = await tts(script); // added await in case tts is async

    await Podcast.create({
      userId: user.userId,
      date: new Date().toDateString(),
      audioUrl: audioUrl,
      script: script,
    });
  }

  console.log("Daily podcasts generated");
};

cron.schedule("0 8 * * *", generateDailyPodcast, {
  scheduled: true,
  timezone: "Asia/Kolkata",
});

module.exports = { generateDailyPodcast };
