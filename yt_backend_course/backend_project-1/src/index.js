// require("dotenv").config({ path: "./src" });  approach 1
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";
// import app from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    //for error handling
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });

    //for starting sever
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!", err);
  });
