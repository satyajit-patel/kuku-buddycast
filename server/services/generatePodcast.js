const { ChatGroq } = require("langchain/chat_models/groq")
const { HumanMessage } = require("langchain/schema")

const generatePodcastScript = async (topics, duration) => {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "mixtral-8x7b-32768"
  })

  const input = `Write a ${duration}-minute podcast script in Hindi on the topics: ${topics.join(", ")}`

  const result = await model.call([new HumanMessage(input)])
  return result.content
}

module.exports = generatePodcastScript
