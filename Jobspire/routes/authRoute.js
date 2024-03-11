import express from "express";
import {
  registerRoute,
  loginRoute,
  getEmailToken,
} from "../controllers/authController.js";
import isEmailVerified from "../middlewares/isEmailVerified.js";

const router = express.Router();

// REGISTER || METHOD -> POST
router.post("/register", registerRoute);

// get email token route method -> POST
router.post("/getToken", getEmailToken);

// LOGIN || METHOD -> POST
router.post("/login", isEmailVerified, loginRoute);

export default router;
