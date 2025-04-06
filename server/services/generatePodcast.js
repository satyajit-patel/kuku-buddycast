const { ChatGroq } = require("@langchain/groq");

const generatePodcastScript = async (topics, duration) => {
  const model = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    apiKey: process.env.GROQ_API_KEY,
  });

  const today = new Date().toDateString();
  const input = `Write a short paragraph podcast script in English on the topics: ${topics.join(", ")}. Today is ${today}. Include some fresh insights and a unique opening message.`;

  const result = await model.invoke(input)
  return result.content
}

module.exports = generatePodcastScript
