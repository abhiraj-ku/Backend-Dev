import express from "express";
import { registerRoute, loginRoute } from "../controllers/authController.js";

const router = express.Router();

// REGISTER || METHOD -> POST
router.post("/register", registerRoute);
// LOGIN || METHOD -> POST
router.post("/login", loginRoute);
export default router;
