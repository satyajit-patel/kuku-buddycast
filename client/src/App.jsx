import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [preferences, setPreferences] = useState({ topics: [], duration: 5 })
  const [podcast, setPodcast] = useState(null)

  const fetchPodcast = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/podcasts/user/123`)
    setPodcast(res.data)
  }

  const updatePreferences = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/preferences/update`, {
      userId: "123",
      topics: preferences.topics,
      duration: preferences.duration
    })
    alert("Preferences Updated")
  }

  useEffect(() => {
    fetchPodcast()
  }, [])

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎧 Kuku BuddyCast</h1>

      {podcast && (
        <div className="mb-6">
          <h2 className="font-semibold text-lg">Today’s Episode</h2>
          <audio controls src={podcast.audioUrl} className="mt-2 w-full" />
          <p className="text-sm mt-2">{podcast.script.slice(0, 100)}...</p>
        </div>
      )}

      <div className="mb-4">
        <h2 className="font-semibold">Your Preferences</h2>
        <input
          type="text"
          placeholder="Enter topics separated by comma"
          className="w-full p-2 border rounded mt-1"
          onChange={(e) => setPreferences({ ...preferences, topics: e.target.value.split(",") })}
        />
        <input
          type="number"
          placeholder="Duration in mins"
          className="w-full p-2 border rounded mt-2"
          onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
        />
        <button onClick={updatePreferences} className="bg-orange-500 mt-3 px-4 py-2 rounded text-white">
          Save Preferences
        </button>
      </div>
    </div>
  )
}

export default App
