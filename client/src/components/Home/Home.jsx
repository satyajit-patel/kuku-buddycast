import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Home() {
  const [preferences, setPreferences] = useState({ topics: "", duration: 5 })
  const [podcast, setPodcast] = useState(null)
  const [loading, setLoading] = useState(true)
  const userId = "123"

  const fetchPodcast = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/podcast/user/${userId}`)
      setPodcast(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchPreferences = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/preference/user/${userId}`)
      if (res.data) {
        setPreferences({
          topics: res.data.topics.join(", "),
          duration: res.data.duration
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const updatePreferences = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/preference/update`, {
        userId,
        topics: preferences.topics.split(",").map((t) => t.trim()),
        duration: Number(preferences.duration)
      })
      alert("Preferences Updated!")
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const init = async () => {
      await fetchPreferences()
      await fetchPodcast()
      setLoading(false)
    }
    init()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <Link to="/">
      <button className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
        Home
      </button>
      </Link>
      <h1 className="text-4xl font-extrabold text-center mb-10 text-orange-400 drop-shadow-lg">🎙️ Kuku BuddyCast</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="loader border-4 border-t-orange-400 border-gray-700 rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium">Please wait...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Preferences Panel */}
          <div className="md:w-1/2 bg-gray-900 p-6 rounded shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-orange-300">Your Preferences</h2>
            <div className="mb-4">
              <label className="block font-medium mb-1">Topics (comma separated):</label>
              <input
                type="text"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
                value={preferences.topics}
                onChange={(e) => setPreferences({ ...preferences, topics: e.target.value })}
                placeholder="e.g., Bollywood, Tech, History"
              />
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-1">Podcast Duration (minutes):</label>
              <input
                type="number"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
                value={preferences.duration}
                onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
                min="1"
              />
            </div>
            <button
              onClick={updatePreferences}
              className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 transition"
            >
              Update Preferences
            </button>
          </div>

          {/* Podcast Panel */}
          <div className="md:w-1/2 bg-gray-900 p-6 rounded shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-orange-300">Today's Podcast</h2>
            {podcast ? (
              <>
                <audio controls className="w-full mb-4">
                  <source src={podcast.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <div className="bg-gray-800 p-4 rounded overflow-auto" style={{ maxHeight: "300px" }}>
                  <pre className="whitespace-pre-wrap text-sm">{podcast.script}</pre>
                </div>
              </>
            ) : (
              <p className="text-gray-400">No podcast available for today. Please check back later.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
