import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    profession: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
    },
    projects: {
      type: [String],
    },

    about: {
      type: String,
    },
    intrest: {
      type: String,
    },
    contact: {
      linkedin: String,
      github: String,
      instagram: String,
      twitter: String,
      dribbble: String,
    },
    image: {
      type: String,
      default: "https://picsum.photos/200",
    },
    phone: {
      type: "String",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
      default:
        "https://images.unsplash.com/photo-1543892607-04657ef3a279?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = new mongoose.model("User", userSchema)

export default User
