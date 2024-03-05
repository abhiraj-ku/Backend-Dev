import express from "express";
import testController from "../controllers/testController.js";

const router = express.Router();
router.route("/testing").get(testController);
export default router;
