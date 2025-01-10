import mongoose from "mongoose";

const dbURI =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URI
    : "mongodb://localhost:27017/xerostore";
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("mongo connected succesfully!");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

export default connectDB;
