import express from "express";
import {
  registerRoute,
  loginRoute,
  getEmailToken,
  verifyEmail,
} from "../controllers/authController.js";
import rateLimit from "express-rate-limit";
import isEmailVerified from "../middlewares/emailVerMiddleware.js";

const limitter = rateLimit({
  windowMs: 2 * 60 * 1000,
  limit: 2,
});
console.log(limitter);

const router = express.Router();

// REGISTER || METHOD -> POST
router.post("/register", limitter, registerRoute);

// get email token route method -> POST
router.post("/getToken", limitter, getEmailToken);

// get email token and verify it method -> POST
router.post("/verify-email/:token", limitter, verifyEmail);

// LOGIN || METHOD -> POST
router.post("/login", isEmailVerified, limitter, loginRoute);

export default router;
