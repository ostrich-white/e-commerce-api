import mongoose from "mongoose";

const { MONGO_URI }= process.env;

const connectDB = async (): Promise<void> => {
  if (!MONGO_URI) throw new Error('MONGO_URI is not defined.');

  try {
    await mongoose.connect(MONGO_URI)
    console.log("DB connected successfully.")

  } catch (error) {
    console.log("DB not connected.")
    console.log(error)
  }
}

export default connectDB;
