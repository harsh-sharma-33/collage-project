import User from "../models/userModel.js"
import genrateToken from "../utils/genrateToken.js"

// Desc     Get Users by one Skill (use kebab case for space)
// Route    GET /api/users/search?skill=python
// Access   Public
export const getUsersBySkill = async (req, res, next) => {
  const requestedSkill = req.query.skill
  try {
    const users = await User.find({ skills: requestedSkill }).select(
      "-password"
    )
    res.send(users)
  } catch (error) {
    next(error)
  }
}

// Desc     Get Users by ID
// Route    GET /api/user/:id
// Access   Public
export const getUsersById = async (req, res, next) => {
  const requestedUserId = req.params.id
  try {
    const user = await User.findById(requestedUserId).select("-password")
    res.send(user)
  } catch (error) {
    next(error)
  }
}

// Desc       Register a user
// Route      POST /api/user/register
// Acess      Public
export const registerUser = async (req, res, next) => {
  const { name, email, address, password, phone } = req.body
  const userExist = await User.findOne({ email })
  if (userExist) {
    const err = new Error("User already exist")
    err.status = 400
    next(err)
  } else {
    try {
      const user = await User.create({
        name,
        email,
        password,
        phone,
        address,
      })
      if (user) {
        res.json({
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          image: user.image,
          token: genrateToken(user._id),
        })
      } else {
        next(new Error("Invalid User Data"))
      }
    } catch (error) {
      next(error)
    }
  }
}

// Desc       login a user
// Route      POST /api/user/login
// Acess      Public
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        address: user.address,
        token: genrateToken(user._id),
      })
    } else {
      next(new Error("Invalid Email or Password"))
    }
  } catch (err) {
    next(err)
  }
}

// Desc     Get User Profile
// Route    GET /api/profile
// Access   Private
export const getUserProfile = async (req, res, next) => {
  const requestedUserId = req.user._id
  try {
    const user = await User.findById(requestedUserId).select("-password")
    res.send(user)
  } catch (error) {
    next(error)
  }
}

// Desc     Update User About Section
// Route    POST  /api/update/about
// Access   Private

export const updateAbout = async (req, res, next) => {
  const requestedUserId = req.user._id
  const newAbout = req.body.about
  try {
    const user = await User.findById(requestedUserId).select("-password")
    user.about = newAbout
    user.save()
    res.status(200).send("success")
  } catch (error) {
    next(error)
  }
}

// Desc     Delete User Skill or Project
// Route    DELETE /api/delete/:toBeDeleted
// Access   Private

export const deleteItem = async (req, res, next) => {
  const deleteFrom = req.params.toBeDeleted
  const requestedUserId = req.user._id
  const itemToDelete = req.body.item
  try {
    const user = await User.findById(requestedUserId).select("-password")
    if (deleteFrom === "skill") {
      user.skills = user.skills.filter((skill) => skill !== itemToDelete)
    }
    if (deleteFrom === "project") {
      user.projects = user.projects.filter(
        (project) => project !== itemToDelete
      )
    }
    user.save()
    res.status(200).send("success")
  } catch (error) {
    next(error)
  }
}

// Desc     Add User Skill or Project
// Route    POST /api/add/:addTo
// Access   Private

export const addItem = async (req, res, next) => {
  const addTo = req.params.addTo
  const requestedUserId = req.user._id
  const itemToAdd = req.body.item
  try {
    const user = await User.findById(requestedUserId).select("-password")
    if (addTo === "skill") {
      user.skills.push(itemToAdd)
    }
    if (addTo === "project") {
      user.projects.push(itemToAdd)
    }
    user.save()
    res.status(200).send("success")
  } catch (error) {
    next(error)
  }
}

// Desc     Update Contact Info
// Route    POST /api/update/contact/:whatToUpdate
// Access   Private

export const updateContactInfo = async (req, res, next) => {
  const whatToUpdate = req.params.whatToUpdate
  const requestedUserId = req.user._id
  const itemToUpdate = req.body.item
  try {
    const user = await User.findById(requestedUserId).select("-password")
    if (whatToUpdate === "phone") {
      user.phone = itemToUpdate
    } else if (whatToUpdate === "email") {
      user.email = itemToUpdate
    } else if (whatToUpdate === "address") {
      user.address = itemToUpdate
    } else if (
      whatToUpdate === "linkedin" ||
      whatToUpdate === "github" ||
      whatToUpdate === "twitter" ||
      whatToUpdate === "dribbble" ||
      whatToUpdate === "instagram"
    ) {
      user.contact[whatToUpdate] = itemToUpdate
    } else {
      next(new Error("Something went wrong"))
    }

    user.save()
    res.status(200).send("success")
  } catch (error) {
    next(error)
  }
}

// Desc     Delete Contact Info
// Route    GET /api/delete/contact/:whatToDelete
// Access   Private

export const deleteContactInfo = async (req, res, next) => {
  const whatToDelete = req.params.whatToDelete
  const requestedUserId = req.user._id
  try {
    const user = await User.findById(requestedUserId).select("-password")
    user.contact[whatToDelete] = ""
    user.save()
    res.status(200).send("success")
  } catch (error) {
    next(error)
  }
}
