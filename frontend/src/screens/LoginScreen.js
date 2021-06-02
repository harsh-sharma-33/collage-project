import React, { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Lottie from "react-lottie"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import lottieAnimation from "../lotties/55932-laptop-and-man.json"
const RegisterScreen = ({ history }) => {
  const [formData, setFormData] = useState({})

  const handleFormData = (e) => {
    const value = e.target.value
    switch (e.target.name) {
      case "email":
        setFormData({ ...formData, email: value })
        break

      case "password":
        setFormData({ ...formData, password: value })
        break

      default:
        setFormData(formData)
    }
  }

  const handleFormSubmit = async () => {
    try {
      const { data } = await axios.post("/api/user/login", formData)
      if (data.token) {
        localStorage.setItem("userInfo", JSON.stringify(data))
        history.push("/")
      }
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }

  return (
    <div className="regster-screen-wrap">
      <ToastContainer />
      <div className="register-screen">
        <div className="left">
          <h1>Login</h1>
          <p>Login to your account now!</p>
          <div className="form">
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                required
                onChange={handleFormData}
                className="input"
              />
              <span></span>
            </label>
            <label htmlFor="password">
              <input
                type="password"
                name="password"
                required
                onChange={handleFormData}
                className="input"
              />
              <span></span>
            </label>{" "}
            <button className="login" onClick={handleFormSubmit}>
              Login
            </button>
          </div>
        </div>

        <div className="right">
          <p>Dont have an account?</p>
          <Link to="/register">
            <button className="login">Register Now</button>
          </Link>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: lottieAnimation,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            width={`90%`}
            height={`90%`}
          />
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
