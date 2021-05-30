import mongoose from "mongoose"
import colors from "colors"
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(
      `MongoDB connected ${connection.connection.host}`.cyan.underline
    )
  } catch (error) {
    console.log(`Error : ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
