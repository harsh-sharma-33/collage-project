import React, { useEffect, useState } from "react"
import axios from "axios"
import ld from "lodash"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { FiArrowRightCircle } from "react-icons/fi"
import { BiPencil } from "react-icons/bi"
import { BsPhone, BsEnvelope } from "react-icons/bs"
import {
  AiOutlineHome,
  AiOutlineLinkedin,
  AiFillGithub,
  AiFillDribbbleCircle,
  AiOutlineInstagram,
} from "react-icons/ai"
import { RiTwitterLine } from "react-icons/ri"
import { toast, ToastContainer } from "react-toastify"
const AdminPopUp = ({ data, dataType, click, refresh, setRefresh }) => {
  const [editAbout, setEditAbout] = useState(false)
  const [about, setAbout] = useState(data)
  const [close, setClose] = useState(false)
  const [newItem, setNewItem] = useState("")
  const [showInput, setShowInput] = useState("")

  const [editContact, setEditContact] = useState({})

  const changeAbout = async () => {
    const { token } = JSON.parse(localStorage.getItem("userInfo"))
    const config = {
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${token}` },
    }
    const { data } = await axios.post(`/api/update/about`, { about }, config)
    if (data) {
      toast.success("About Changed")
      setRefresh(!refresh)
    }
  }

  const deleteListItem = async (item) => {
    let pathTo = ""
    if (dataType === "skills") {
      pathTo = "skill"
    } else if (dataType === "project") {
      pathTo = "project"
    }
    const { token } = JSON.parse(localStorage.getItem("userInfo"))
    const config = {
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${token}` },
    }
    const { data } = await axios.post(`/api/delete/${pathTo}`, { item }, config)
    if (data) {
      toast.success(`${ld.capitalize(pathTo)} Removed Successfully`)
      setRefresh(!refresh)
    }
  }

  const addListItem = async (item) => {
    let pathTo = ""
    if (dataType === "skills") {
      pathTo = "skill"
    } else if (dataType === "project") {
      pathTo = "project"
    }
    const { token } = JSON.parse(localStorage.getItem("userInfo"))
    const config = {
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${token}` },
    }
    const { data } = await axios.post(`/api/add/${pathTo}`, { item }, config)
    if (data) {
      toast.success(`${ld.capitalize(pathTo)} Added Successfully`)
      setRefresh(!refresh)
    }
  }

  const editHandler = async () => {
    let whatToUpdate
    const { token } = JSON.parse(localStorage.getItem("userInfo"))
    const config = {
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${token}` },
    }
    setShowInput("")
    switch (Object.keys(editContact)[0]) {
      case "phone":
        whatToUpdate = "phone"
        break

      case "email":
        whatToUpdate = "email"

        break

      case "address":
        whatToUpdate = "address"

        break
      case "github":
        whatToUpdate = "github"

        break

      case "linkedin":
        whatToUpdate = "linkedin"
        break

      case "dribbble":
        whatToUpdate = "dribbble"

        break

      case "instagram":
        whatToUpdate = "instagram"

        break

      case "twitter":
        whatToUpdate = "twitter"

        break

      default:
        console.log("")
    }

    try {
      const { data } = await axios.post(
        `/api/update/contact/${whatToUpdate}`,
        { item: Object.values(editContact)[0] },
        config
      )
      if (data) {
        toast.success(data)
        setRefresh(!refresh)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteContactHandler = async (item) => {
    const { token } = JSON.parse(localStorage.getItem("userInfo"))
    const config = {
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${token}` },
    }
    try {
      const { data } = await axios.get(`/api/delete/contact/${item}`, config)
      if (data) {
        toast.info("Deleted")
        setRefresh(!refresh)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (data === null) {
      setClose(true)
    } else {
      setClose(false)
      setEditAbout(false)
    }
  }, [click, data])
  return (
    <>
      <ToastContainer />
      <div className={close ? "popup-wrapper close" : "popup-wrapper"}>
        <div className="popup-component">
          <div
            className="close-btn"
            onClick={() => {
              setClose(true)
            }}
          ></div>
          {dataType === "about" && (
            <div className="about">
              <h2>About</h2>
              {editAbout ? (
                <>
                  <textarea
                    value={about}
                    onChange={(e) => {
                      setAbout(e.target.value)
                    }}
                  >
                    {data}
                  </textarea>
                  <button className="edit-btn" onClick={changeAbout}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>{data}</p>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditAbout(true)
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          )}

          {(dataType === "project" || dataType === "skills") && (
            <div className="list-data">
              <h2>{dataType}</h2>
              <ul>
                {data &&
                  data.map((item) => {
                    return (
                      <li className="list-data-item">
                        {ld.capitalize(ld.upperCase(item))}
                        <AiOutlineCloseCircle
                          className="delete-btn"
                          onClick={() => {
                            deleteListItem(item)
                          }}
                        />
                      </li>
                    )
                  })}
                <div className="add-new-wrap">
                  <input
                    type="text"
                    value={newItem}
                    className="add-new"
                    onKeyPress={(e) => {
                      e.key === "Enter" && addListItem(ld.kebabCase(newItem))
                    }}
                    onChange={(e) => {
                      setNewItem(e.target.value)
                    }}
                  />
                  <div
                    className="btn-arrow"
                    onClick={() => {
                      addListItem(ld.kebabCase(newItem))
                      setNewItem("")
                    }}
                  >
                    <FiArrowRightCircle />
                  </div>
                </div>
              </ul>
            </div>
          )}

          {dataType === "contact" && (
            <div className="contact-data list-data">
              <h2>{dataType}</h2>
              <ul>
                <li className="contact-li-flex">
                  <BsPhone />
                  {showInput && showInput === "phone" ? (
                    <>
                      <input
                        type="text"
                        name="phone"
                        onChange={(e) => {
                          setEditContact({ phone: e.target.value })
                        }}
                      />
                      <div className="btn-arrow" onClick={editHandler}>
                        <FiArrowRightCircle />
                      </div>
                    </>
                  ) : (
                    <>
                      <p>{data.phone}</p>
                      <div
                        className="pen"
                        name="phone"
                        onClick={() => {
                          setShowInput("phone")
                        }}
                      >
                        <BiPencil />
                      </div>
                    </>
                  )}
                </li>

                <li className="contact-li-flex">
                  <BsEnvelope />

                  {showInput && showInput === "email" ? (
                    <>
                      <input
                        type="text"
                        name="email"
                        onChange={(e) => {
                          setEditContact({ email: e.target.value })
                        }}
                      />
                      <div className="btn-arrow" onClick={editHandler}>
                        <FiArrowRightCircle />
                      </div>
                    </>
                  ) : (
                    <>
                      <p>{data.email}</p>
                      <div
                        className="pen"
                        name="email"
                        onClick={() => {
                          setShowInput("email")
                        }}
                      >
                        <BiPencil />
                      </div>
                    </>
                  )}
                </li>

                <li className="contact-li-flex">
                  <AiOutlineHome />

                  {showInput && showInput === "address" ? (
                    <>
                      <input
                        type="text"
                        name="address"
                        onChange={(e) => {
                          setEditContact({ address: e.target.value })
                        }}
                      />
                      <div className="btn-arrow" onClick={editHandler}>
                        <FiArrowRightCircle />
                      </div>
                    </>
                  ) : (
                    <>
                      <p>{data.address}</p>
                      <div
                        className="pen"
                        name="address"
                        onClick={() => {
                          setShowInput("address")
                        }}
                      >
                        <BiPencil />
                      </div>
                    </>
                  )}
                </li>

                {data.contact.github ? (
                  <li className="contact-li-flex">
                    <AiFillGithub />
                    <a href={data.contact.github}>{data.contact.github}</a>
                    <AiOutlineCloseCircle
                      className="delete-btn"
                      onClick={() => {
                        deleteContactHandler("github")
                      }}
                    />
                  </li>
                ) : (
                  <li className="contact-li-flex">
                    <AiFillGithub />
                    <input
                      type="text"
                      onChange={(e) => {
                        setEditContact({ github: e.target.value })
                      }}
                    />

                    <div className="btn-arrow" onClick={editHandler}>
                      <FiArrowRightCircle />
                    </div>
                  </li>
                )}

                {data.contact.linkedin ? (
                  <li className="contact-li-flex">
                    <AiOutlineLinkedin />
                    <a href={data.contact.linkedin}>{data.contact.linkedin}</a>
                    <AiOutlineCloseCircle
                      className="delete-btn"
                      onClick={() => {
                        deleteContactHandler("linkedin")
                      }}
                    />
                  </li>
                ) : (
                  <li className="contact-li-flex">
                    <AiOutlineLinkedin />
                    <input
                      type="text"
                      onChange={(e) => {
                        setEditContact({ linkedin: e.target.value })
                      }}
                    />
                    <div className="btn-arrow" onClick={editHandler}>
                      <FiArrowRightCircle />
                    </div>
                  </li>
                )}

                {data.contact.dribbble ? (
                  <li className="contact-li-flex">
                    <AiFillDribbbleCircle />
                    <a href={data.contact.dribbble}>{data.contact.dribbble}</a>
                    <AiOutlineCloseCircle
                      className="delete-btn"
                      onClick={() => {
                        deleteContactHandler("dribbble")
                      }}
                    />
                  </li>
                ) : (
                  <li className="contact-li-flex">
                    <AiFillDribbbleCircle />
                    <input
                      type="text"
                      onChange={(e) => {
                        setEditContact({ dribbble: e.target.value })
                      }}
                    />
                    <div className="btn-arrow" onClick={editHandler}>
                      <FiArrowRightCircle />
                    </div>
                  </li>
                )}

                {data.contact.instagram ? (
                  <li className="contact-li-flex">
                    <AiOutlineInstagram />

                    <a href={data.contact.instagram}>
                      {data.contact.instagram}
                    </a>
                    <AiOutlineCloseCircle
                      className="delete-btn"
                      onClick={() => {
                        deleteContactHandler("instagram")
                      }}
                    />
                  </li>
                ) : (
                  <li className="contact-li-flex">
                    <AiOutlineInstagram />
                    <input
                      type="text"
                      onChange={(e) => {
                        setEditContact({ instagram: e.target.value })
                      }}
                    />
                    <div className="btn-arrow" onClick={editHandler}>
                      <FiArrowRightCircle />
                    </div>
                  </li>
                )}

                {data.contact.twitter ? (
                  <li className="contact-li-flex">
                    <RiTwitterLine />
                    <a href={data.contact.twitter}>{data.contact.twitter}</a>
                    <AiOutlineCloseCircle
                      className="delete-btn"
                      onClick={() => {
                        deleteContactHandler("twitter")
                      }}
                    />
                  </li>
                ) : (
                  <li className="contact-li-flex">
                    <RiTwitterLine />
                    <input
                      type="text"
                      onChange={(e) => {
                        setEditContact({ twitter: e.target.value })
                      }}
                    />
                    <div className="btn-arrow" onClick={editHandler}>
                      <FiArrowRightCircle />
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AdminPopUp
