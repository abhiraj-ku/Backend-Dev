// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDb from "./config/db.js";
import testRoute from "./routes/testRoute.js";
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

app.listen(PORT, () => {
  console.log(`connected to port ${PORT} ....`);
});
