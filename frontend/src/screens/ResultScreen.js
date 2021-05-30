import React, { useEffect, useState } from "react"
import axios from "axios"
import ld from "lodash"
import Card from "../components/Card"
import NavBar from "../components/NavBar"
import { useLocation } from "react-router-dom"
const ResultScreen = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const [input, setInput] = useState("")
  const searchedSkill = input
    ? ld.kebabCase(input)
    : location.search.split("=")[1]

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `/api/users/search?skill=${searchedSkill}`
      )
      setUsers(data)
      console.log(data)
      setLoading(false)
    }
    fetchData()
  }, [location, searchedSkill])
  return (
    <div className="result-screen-wrapper">
      <div className="result-screen-top">
        <NavBar />
        <input
          type="text"
          name="searchBar"
          placeholder="Search Skill"
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />
      </div>

      <main className="search-result-main">
        <p className="search-result-for">
          {" "}
          Results for "{ld.capitalize(ld.upperCase(searchedSkill))}"
        </p>

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="card-container">
            {users.map((user) => {
              return (
                <Card
                  key={user._id}
                  image={user.image}
                  name={user.name}
                  about={user.about}
                  profession={user.profession}
                  id={user._id}
                />
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default ResultScreen
