import chalk from 'chalk'
import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => {
        console.log(
          `✔️  ${chalk.greenBright('Connected to MongoDB:')} ${
            conn.connection.host
          }`
        )
      })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB
