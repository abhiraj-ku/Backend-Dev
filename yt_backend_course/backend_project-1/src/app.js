import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//for accepting json data
app.use(express.json({ limit: "16kb" }));

//for accepting url data in encoded format
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

export { app };
