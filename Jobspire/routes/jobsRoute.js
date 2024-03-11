import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import createJobs from "../controllers/jobsController.js";

const router = express.Router();

// Create jobs || Method -> post
router.post("/create-job", userAuth, createJobs);

export default router;
