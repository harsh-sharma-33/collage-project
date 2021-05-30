import React, { useEffect, useState } from "react"
import { BsPhone, BsEnvelope } from "react-icons/bs"
import {
  AiOutlineHome,
  AiOutlineLinkedin,
  AiFillGithub,
  AiFillDribbbleCircle,
  AiOutlineInstagram,
} from "react-icons/ai"
import { RiTwitterLine } from "react-icons/ri"
import ld from "lodash"
const PopUp = ({ data, dataType, click }) => {
  useEffect(() => {
    if (data === null) {
      setClose(true)
    } else {
      setClose(false)
    }
  }, [click, data])
  const [close, setClose] = useState(false)

  console.log(data)
  return (
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
            <p>{data}</p>
          </div>
        )}
        {(dataType === "skills" || dataType === "project") && (
          <div className="list-data">
            <h2>{dataType}</h2>
            <ul>
              {data &&
                data.map((item) => {
                  return (
                    <li className="list-data-item">
                      {ld.capitalize(ld.upperCase(item))}
                    </li>
                  )
                })}
            </ul>
          </div>
        )}
        {dataType === "contact" && (
          <div className="contact-data list-data">
            <h2>{dataType}</h2>
            <ul>
              <li className="contact-li-flex">
                <BsPhone />
                <p>{data.phone}</p>
              </li>

              <li className="contact-li-flex">
                <BsEnvelope />
                <p>{data.email}</p>
              </li>

              <li className="contact-li-flex">
                <AiOutlineHome />
                <p>{data.address}</p>
              </li>

              {data.contact.github ? (
                <li className="contact-li-flex">
                  <AiFillGithub />
                  <a href={data.contact.github}>{data.contact.github}</a>
                </li>
              ) : null}

              {data.contact.linkedin ? (
                <li className="contact-li-flex">
                  <AiOutlineLinkedin />
                  <a href={data.contact.linkedin}>{data.contact.linkedin}</a>
                </li>
              ) : null}

              {data.contact.dribbble ? (
                <li className="contact-li-flex">
                  <AiFillDribbbleCircle />
                  <a href={data.contact.dribbble}>{data.contact.dribbble}</a>
                </li>
              ) : null}

              {data.contact.instagram ? (
                <li className="contact-li-flex">
                  <AiOutlineInstagram />
                  <a href={data.contact.instagram}>{data.contact.instagram}</a>
                </li>
              ) : null}

              {data.contact.twitter ? (
                <li className="contact-li-flex">
                  <RiTwitterLine />
                  <a href={data.contact.twitter}>{data.contact.twitter}</a>
                </li>
              ) : null}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default PopUp
