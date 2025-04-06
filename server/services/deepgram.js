require('dotenv').config({ path: '../.env' });
const axios = require('axios');

const tts = async (text) => {
  const url = 'https://api.deepgram.com/v1/speak';
  const options = {
    headers: {
      Authorization: `Token ${process.env.apiKey}`,
      'Content-Type': 'application/json'
    },
    responseType: 'arraybuffer' // Get binary data
  };

  try {
    const response = await axios.post(url, { text }, options);
    // Convert the binary data to a Base64-encoded string
    const base64Audio = Buffer.from(response.data, 'binary').toString('base64');
    // Create a data URL for the audio (assuming content-type is audio/mpeg)
    const playableUrl = `data:audio/mpeg;base64,${base64Audio}`;
    // console.log("Playable URL:", playableUrl);
    return playableUrl;
  } catch (error) {
    console.error("Error generating TTS:", error);
    return null;
  }
};

// const run = async () => {
//   const audioLink = await tts("Hello, this is a test message from Deepgram API.");
//   // Now you can send `audioLink` to the frontend where it can be used in an <audio> element.
// }

// run();

module.exports = {tts};
