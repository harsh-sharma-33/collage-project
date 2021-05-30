import React from "react"
import { Route, Redirect } from "react-router-dom"
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("userInfo")) {
          const { id } = JSON.parse(localStorage.getItem("userInfo"))
          return <Component {...props} id={id} />
        } else {
          return <Redirect to="/login" />
        }
      }}
    />
  )
}

export default ProtectedRoute
