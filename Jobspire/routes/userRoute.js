import express from "express";
const router = express.Router();
import userAuth from "../middlewares/authMiddleware.js";
import updateUser from "../controllers/userController.js";

// Put Method to upddate users -details

router.put("/update-user", userAuth, updateUser);
export default router;
