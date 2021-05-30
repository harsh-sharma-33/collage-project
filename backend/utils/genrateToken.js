import jwt from "jsonwebtoken"
const genrateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET)
  return token
}

export default genrateToken
