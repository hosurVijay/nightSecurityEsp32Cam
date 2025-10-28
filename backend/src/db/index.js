import mongoose from "mongoose";
import { DBNAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGOBD_URL}/${DBNAME}`
    );
    console.log(
      `MongoDb Is connect. HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Connection Failed Try Again.");
    process.exit(1);
  }
};

export { connectDB };
