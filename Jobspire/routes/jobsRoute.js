import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobs,
  getAllJobs,
  updatejobs,
} from "../controllers/jobsController.js";

const router = express.Router();

// Create jobs || Method -> post
router.post("/create-job", userAuth, createJobs);

// get jobs || Method -> Get

router.get("/get-jobs", userAuth, getAllJobs);

// update jobs
router.post("/update-job/:id", userAuth, updatejobs);

export default router;
