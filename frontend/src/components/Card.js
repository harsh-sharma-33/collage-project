import React, { useState } from "react"
import { AiFillInfoCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
const Card = ({ image, name, about, id, profession }) => {
  const [infoOn, setInfoOn] = useState(false)
  return (
    <div className={infoOn ? "card-body-wrap info-on" : "card-body-wrap"}>
      <div
        className="card-wrapper"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="name-profession">
          <h2>{name}</h2>
          {profession && <p>{profession}</p>}
        </div>

        <div className="about-overly">
          <img src={image} alt="profile" />
          <h2>{name}</h2>
          {profession && <p>{profession}</p>}
          <div className="name-profession-about">
            <p className="about">{about}</p>
          </div>
          <Link to={`/user/${id}`} className="link-card">
            <button>View Profile</button>
          </Link>
        </div>

        <div
          className="info-btn"
          onClick={() => {
            setInfoOn(!infoOn)
          }}
        >
          <AiFillInfoCircle />
        </div>
      </div>
    </div>
  )
}

export default Card
