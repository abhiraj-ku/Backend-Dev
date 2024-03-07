// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDb from "./config/db.js";
import testRoute from "./routes/testRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
const app = express();

//doenv config
dotenv.config();
const PORT = process.env.PORT || 8080;

// database connection
connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("<h1>Hello from backend</h1>");
});
// middeware
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(`connected to port ${PORT} ....`);
});
