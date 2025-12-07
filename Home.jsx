import { useState, useEffect } from "react";

export const Home = () => {
  const [username, setUserName] = useState("")
  const [results, setResults] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (username.trim() === "") {
      return
    }

    setLoading(true)

    async function startFetch() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        const data = await response.json()
        setResults(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    const interval = setTimeout(() => {
      startFetch()
    }, 900);

    return () => clearTimeout(interval)


  }, [username])

  function handleUserName(event) {
    setUserName(event.target.value)
  }

  function handleClear() {
    setUserName("")
    setResults("")
  }

  return (
    <div>
      <div>
        <h1>GitHub Account Search App </h1>
        <input type="text" value={username} onChange={handleUserName} className="inputSide" />
        <button onClick={handleClear}>Clear</button>
      </div>

      <div className="resultsContainer">
        {
          loading && <h3>Loading....</h3>
        }
        <h2>Name: {results.login ? results.login : "Guest"}</h2>
        <p>Followers: {results.followers ? results.followers : "N/A"}</p>
        <p>Followering: {results.following ? results.following : "N/A"}</p>
        <img src={results.avatar_url} className="imageSide" />
      </div>
    </div>
  )

}
