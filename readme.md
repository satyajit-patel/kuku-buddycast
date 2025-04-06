# 🎧 Kuku BuddyCast

**Kuku BuddyCast** is an AI-powered personalized audio content generator.

## Find the live link [here](https://kuku-buddycast.vercel.app)

### 🔥 What It Does

- Generates a daily, personalized podcast based on each user’s preferences (topics + duration).
- Uses LangChain with Groq’s LLM to script podcasts in Hindi.
- Scripts are converted to audio (TTS can be plugged in) and stored.
- User can set or update their content preferences anytime.
- A cron job runs every morning to generate new content for all users.

### 🚀 Stack Used

- **Frontend**: React.js + Tailwind CSS  
- **Backend**: Node.js + Express  
- **AI**: LangChain + Groq  
- **Database**: MongoDB  
- **Scheduler**: node-cron  
- **Text to Speech**: Deepgram
