import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
const NavBar = ({ history }) => {
  const [navOpen, setNavOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const [logout, setLogout] = useState(false)
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  )

  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    setUserInfo(null)
    setLogout(false)
  }

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem("userInfo"))
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`/api/user/${id}`)
        if (data) {
          setUserInfo(data)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchUserData()
  }, [])

  console.log(userInfo)
  return (
    <nav className="navbar">
      {logout && (
        <div className="logout-screen">
          <div>
            <h1>Logout?</h1>
            <button className="logout" onClick={logoutHandler}>
              Logout
            </button>
            <button className="cancel" onClick={() => setLogout(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <Link to="/" className="links">
        <h3 className="brand">Helpy</h3>
      </Link>
      <ul className={navOpen ? "nav-list active" : "nav-list"}>
        <Link to="/" className="links">
          <li className="nav-link active">Home</li>
        </Link>
        {userInfo ? (
          <li className="nav-link active" onClick={() => setMenu(!menu)}>
            <div className="overly-wrap">
              <img
                src={userInfo.image}
                alt="profile"
                className="nav-profile "
              />
              <div className={menu ? "menu" : "menu hide"}>
                <Link to="/my-profile" className="links profile">
                  Profile
                </Link>
                <div className="logout" onClick={() => setLogout(true)}>
                  Logout
                </div>
              </div>
            </div>
          </li>
        ) : (
          <>
            <Link to="/register" className="links">
              <li className="nav-link">Register</li>
            </Link>
            <Link to="/login" className="links">
              <li className="nav-link">Login</li>
            </Link>
          </>
        )}
      </ul>
      <div
        className={navOpen ? "toggle-menu active" : "toggle-menu"}
        onClick={() => {
          setNavOpen(!navOpen)
          console.log(navOpen)
        }}
      >
        <span></span>
        <span className="middle"></span>
        <span></span>
      </div>
    </nav>
  )
}

export default NavBar
