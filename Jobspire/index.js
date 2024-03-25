// packages import
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

// security packages
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// db config import
import connectDb from "./config/db.js";

// routes
import testRoute from "./routes/testRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import jobsRoute from "./routes/jobsRoute.js";
// import { rateLimit } from "express-rate-limit";

const app = express();

//doenv config
dotenv.config();
const PORT = process.env.PORT || 8080;

// database connection
connectDb();
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("<h1>Hello from backend</h1>");
});

// middewares
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/jobs", jobsRoute);

app.listen(PORT, () => {
  console.log(`connected to port ${PORT} ....`);
});
