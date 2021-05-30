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
      case "name":
        setFormData({ ...formData, name: value })
        break

      case "email":
        setFormData({ ...formData, email: value })
        break

      case "address":
        setFormData({ ...formData, address: value })
        break

      case "phone":
        setFormData({ ...formData, phone: value })
        break
      case "password":
        setFormData({ ...formData, password: value })
        break

      case "confirm-password":
        setFormData({ ...formData, confirmPassword: value })
        break

      default:
        setFormData(formData)
    }
  }

  const handleFormSubmit = async () => {
    if (formData.password === formData.confirmPassword) {
      try {
        const { data } = await axios.post("/api/user/register", formData)
        localStorage.setItem("userInfo", JSON.stringify(data))
        if (data.token) {
          history.push("/")
        }
      } catch (error) {
        toast.error(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      }
    } else {
      toast.warning("Password dont match")
    }
  }

  return (
    <div className="regster-screen-wrap">
      <ToastContainer />
      <div className="register-screen">
        <div className="left">
          <h1>Create Account</h1>
          <p>Create an account now and help the community!</p>
          <div className="form">
            <div className="div">
              <label htmlFor="name">
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleFormData}
                />
                <span></span>
              </label>

              <label htmlFor="email">
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleFormData}
                />
                <span></span>
              </label>
            </div>
            <div>
              <label htmlFor="phone">
                <input
                  type="text"
                  name="phone"
                  required
                  onChange={handleFormData}
                />
                <span></span>
              </label>

              <label htmlFor="address">
                <input
                  type="text"
                  name="address"
                  required
                  onChange={handleFormData}
                />
                <span></span>
              </label>
            </div>
            <div>
              <label htmlFor="password">
                <input
                  type="password"
                  name="password"
                  required
                  onChange={handleFormData}
                />
                <span></span>
              </label>
              <label htmlFor="confirm-password">
                <input
                  type="password"
                  name="confirm-password"
                  required
                  onChange={handleFormData}
                />
                <span></span>
              </label>
            </div>
            <button onClick={handleFormSubmit}>Register</button>
          </div>
        </div>
        <div className="right">
          <p>Already a member?</p>
          <Link to="/login">
            <button className="login">Login</button>
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
