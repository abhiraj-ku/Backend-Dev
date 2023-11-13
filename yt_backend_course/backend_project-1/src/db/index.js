import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

/*
Good approach for a db connection
1.Always use try catch block for error handling
2. use async-await for making the database connection smooth as db can be stored somewhere else in "another continent"
*/

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log(`\n MongoDB connected : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MONGO_DB connection error :", error);
    process.exit(1);
  }
};

export default connectDB;
