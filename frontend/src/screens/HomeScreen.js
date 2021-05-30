import React, { useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { Link, useHistory } from "react-router-dom"
import NavBar from "../components/NavBar"
import ld from "lodash"
const HomeScreen = () => {
  const [input, setInput] = useState("")
  const [searchedSkill, setSearchedSkill] = useState("")
  const history = useHistory()
  const handleSearch = () => {
    history.push(`/results?skill=${searchedSkill}`)
  }

  useEffect(() => {
    setSearchedSkill(ld.kebabCase(input))
  }, [input])
  return (
    <div className="home-screen-wrapper" onKeyDown>
      <NavBar />
      <main className="home-screen-main">
        <h1>Get Help By Experts</h1>
        <p>Search the skill you need</p>
        <div>
          <input
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            type="text"
            value={input}
            placeholder="Search Skill"
            onChange={(e) => {
              setInput(e.target.value)
            }}
          />
          <Link to={`/results?skill=${searchedSkill}`}>
            <button>
              <BiSearch />
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default HomeScreen
