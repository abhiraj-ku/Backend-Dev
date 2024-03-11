import User from "../models/userModel.js";
import sendEmail from "../utils/sendMail.js";
import { v4 as uuidv4 } from "uuid";

// Register Route
export const registerRoute = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    // finding if user already registered
    const isUserPresent = await User.findOne({ "email.address": email });

    if (isUserPresent) {
      return res.status(400).send({
        error: "User already present , Please login or Create new account",
      });
    }

    // Validation
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({
        error: "Password is required and must be at least 6 characters long",
      });
    }
    // adding email validation email sender here

    // creating new user
    const user = await User.create({
      name,
      password,
      lastName,
      email: {
        address: email,
      },
    });
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    console.error("Error in register controller:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// Send email token Route
export const getEmailToken = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user.isVerified) {
    return res.status(201).send({
      message: "Email is already verified , Login now ",
    });
  }
};
// Login Route || Method -> POST
export const loginRoute = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email or Password is missing",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid username or password ",
      });
    }

    const isPassMatching = await user.comparePassword(password);
    if (!isPassMatching) {
      return res.status(400).send({
        success: false,
        message: "Login failed, Please enter correct email and password",
      });
    }
    user.password = undefined;
    const token = user.createJWT();

    res.status(200).send({
      success: true,
      message: "Login successful, you may proceed",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};
