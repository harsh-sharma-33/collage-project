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
  changeUsername,
  changeProfile,
  changeCover,
} from "./controllers/userController.js"
import { errorHandler } from "./middleware/errorMiddleware.js"
import { protect } from "./middleware/authMiddleware.js"
import multer from "multer"
import path from "path"
dotenv.config()
connectDB()
const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

// ----------------------MULTER CODE GOES HERE ----------------------
// Setting up multer storage engine
const profileFileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, `profile-${req.user._id}${path.extname(file.originalname)}`)
  },
})

const coverFileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, `banner-${req.user._id}${path.extname(file.originalname)}`)
  },
})

const checkFileType = (file, cb) => {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb("Images Only!")
  }
}

const upload = multer({
  storage: profileFileStorage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  },
})

// ----------------------------------------------------------------------

app.get("/", (req, res) => res.send("Api is running..."))

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

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

app.get("/api/delete/remove/:whatToDelete", protect, deleteContactInfo)

app.post("/api/change/username", protect, changeUsername)

app.post("/api/upload/profile", protect, upload.single("image"), changeProfile)

app.post("/api/upload/cover", protect, upload.single("image"), changeCover)

// error handler
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Api rinning at port ${port} `)
})
