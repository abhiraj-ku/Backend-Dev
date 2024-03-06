import express from "express";
import registerRoute from "../controllers/testController.js";

const router = express.Router();
router.post("/register", registerRoute);
export default router;
