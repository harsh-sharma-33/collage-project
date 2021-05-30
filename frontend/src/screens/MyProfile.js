import React, { useEffect, useState } from "react"
import { BsPhone, BsEnvelope } from "react-icons/bs"
import { BiPencil } from "react-icons/bi"
import { AiOutlineHome } from "react-icons/ai"
import axios from "axios"
import ld from "lodash"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AdminPopUp from "../components/AdminPopup"
const UserScreen = ({ id: UserId }) => {
  const [user, setUser] = useState({})
  const [readMoreButton, setReadMoreButton] = useState("")
  const [clickedButton, setClickedButton] = useState(false)
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem("userInfo"))

        const config = {
          "Content-Type": "application/json",
          headers: { Authorization: `Bearer ${token}` },
        }

        const { data } = await axios.get(`/api/profile`, config)
        await setUser(data)
      } catch (error) {
        toast.error(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      }
    }
    fetchUserData()
  }, [UserId, refresh])

  const handleReadMore = (e) => {
    switch (e.target.name) {
      case "about-btn":
        setReadMoreButton("about")
        setClickedButton(!clickedButton)
        break
      case "contact-btn":
        setReadMoreButton("contact")
        setClickedButton(!clickedButton)
        break
      case "skills-btn":
        setReadMoreButton("skills")
        setClickedButton(!clickedButton)
        break
      case "projects-btn":
        setReadMoreButton("project")
        setClickedButton(!clickedButton)
        break
      default: {
        return
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <div
        className="user-screen-wrapper"
        style={{ backgroundImage: `url(${user.cover})` }}
      >
        <AdminPopUp
          dataType={readMoreButton}
          click={clickedButton}
          refresh={refresh}
          setRefresh={setRefresh}
          data={
            readMoreButton === "about"
              ? user.about
              : readMoreButton === "contact"
              ? {
                  contact: user.contact,
                  phone: user.phone,
                  address: user.address,
                  email: user.email,
                }
              : readMoreButton === "skills"
              ? user.skills
              : readMoreButton === "project"
              ? user.projects
              : null
          }
        />
        <main className="user-screen-main">
          <div
            className="banner"
            style={{ backgroundImage: `url(${user.cover})` }}
          >
            <div className="user-image">
              <img src={user.image} alt="profile" className="profile-img" />
              <div className="edit-pen">
                <BiPencil />
              </div>
            </div>
            <button>Message</button>
          </div>

          <div className="user-content">
            <div className="left">
              <div className="name-profession-wrap">
                <h1 className="user-name">{user.name}</h1>
                <h3>{user.profession}</h3>
                <div className="edit-pen">
                  <BiPencil />
                </div>
              </div>
              <div className="contact-info">
                <h3>Contact</h3>
                <ul>
                  <li>
                    <p className="icon">
                      <BsPhone />
                    </p>
                    <p className="value">{user.phone}</p>
                  </li>
                  <li>
                    <p className="icon">
                      <BsEnvelope />
                    </p>
                    <p className="value">{user.email}</p>
                  </li>

                  <li>
                    <p className="icon">
                      <AiOutlineHome />
                    </p>
                    <p className="value">{user.address}</p>
                  </li>

                  <li>
                    <button name="contact-btn" onClick={handleReadMore}>
                      Read More
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="right">
              <div className="about">
                <h3>About</h3>
                <p>
                  {user.about && user.about.slice(0, 100)}...
                  <button
                    className="read-more"
                    name="about-btn"
                    onClick={handleReadMore}
                  >
                    Read More
                  </button>
                </p>
              </div>

              <div className="skills">
                <h3>Skills</h3>
                <ul>
                  {user.skills &&
                    user.skills
                      .slice(0, 9)
                      .map((skill) => (
                        <li>{ld.capitalize(ld.upperCase(skill))}</li>
                      ))}

                  <button
                    className="read-more"
                    name="skills-btn"
                    onClick={handleReadMore}
                  >
                    Read More
                  </button>
                </ul>
              </div>

              <div className="projects">
                <h3>Projects</h3>
                <ul>
                  {user.projects &&
                    user.projects
                      .slice(0, 9)
                      .map((project) => <li>{project}</li>)}

                  <button
                    className="read-more"
                    name="projects-btn"
                    onClick={handleReadMore}
                  >
                    Read More
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default UserScreen
