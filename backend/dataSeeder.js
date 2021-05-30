import connectDB from "./config/db.js"
import colors from "colors"
import User from "./models/userModel.js"
import { users } from "./data/userSampleData.js"
import dotenv from "dotenv"
dotenv.config()
connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    const createdUsers = await User.insertMany(users)
    if (createdUsers) {
      console.log("Data Imported Successfully".green.inverse)
      process.exit()
    }
  } catch (error) {
    console.log(`Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    console.log("Data Destroyed!!".red)
    process.exit()
  } catch (error) {
    console.log(`Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
