const express = require("express")
const cors = require("cors")
require("dotenv").config()
const handleRoute = require("./routes/handleRoute");
const dbConnect = require("./configs/db");
const {generateDailyPodcast} = require("./cron/dailyPodcast");

const app = express()
const PORT = process.env.PORT;

dbConnect();

app.use(cors())
app.use(express.json())
app.use("/api/v1", handleRoute);
app.use("/ping", (req, res) => {
  res.send("pong");
});

// generateDailyPodcast();

app.listen(PORT, () => {    
  console.log("Server started at port", PORT);
});
