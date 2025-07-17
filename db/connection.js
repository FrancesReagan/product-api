import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDb: ", error);
    process.exit(1);
  }
};

export default connectDB;