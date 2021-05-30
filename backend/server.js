import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import {
  getUsersBySkill,
  getUsersById,
  registerUser,
  loginUser,
  getUserProfile,
  updateAbout,
  deleteItem,
  addItem,
  updateContactInfo,
  deleteContactInfo,
} from "./controllers/userController.js"
import { errorHandler } from "./middleware/errorMiddleware.js"
import { protect } from "./middleware/authMiddleware.js"
dotenv.config()
connectDB()
const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.get("/", (req, res) => res.send("Api is running..."))

// routes
app.get("/api/users/search", getUsersBySkill)
app.get("/api/user/:id", getUsersById)

app.get("/api/profile/", protect, getUserProfile)

app.post("/api/user/register", registerUser)
app.post("/api/user/login", loginUser)

app.post("/api/update/about", protect, updateAbout)

app.post("/api/delete/:toBeDeleted", protect, deleteItem)

app.post("/api/add/:addTo", protect, addItem)

app.post("/api/update/contact/:whatToUpdate", protect, updateContactInfo)

app.get("/api/delete/contact/:whatToDelete", protect, deleteContactInfo)

// error handler
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Api rinning at port ${port} `)
})
