const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const preferenceRoutes = require("./routes/preferences")
const podcastRoutes = require("./routes/podcasts")
const dailyPodcastCron = require("./cron/dailyPodcast")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/preferences", preferenceRoutes)
app.use("/api/podcasts", podcastRoutes)

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected")
  app.listen(5000, () => console.log("Server started at port 5000"))
  dailyPodcastCron.start()
})
