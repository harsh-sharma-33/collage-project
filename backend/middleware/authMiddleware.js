import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const protect = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decodedToken.id).select("-password")
      next()
    } catch (error) {
      res.status(401)
      next(new Error("Not Authorized Token Failed"))
    }
  }

  if (!token) {
    res.status(401)
    next(new Error("Not Authorized No Token"))
  }
}

export { protect }
