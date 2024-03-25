import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobs,
  getAllJobs,
  updatejobs,
  jobStats,
} from "../controllers/jobsController.js";

const router = express.Router();

// Create jobs || Method -> post
router.post("/create-job", userAuth, createJobs);

// get jobs || Method -> Get

router.get("/get-jobs", userAuth, getAllJobs);

// update jobs
router.post("/update-jobs/:id", userAuth, updatejobs);

// jobs stats filter -> GET
router.get("/job-stats", userAuth, jobStats);

export default router;
