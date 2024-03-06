import User from "../models/userModel.js";

// Register Route
export const registerRoute = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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

    // finding if user already registered
    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      return res.status(400).send({
        error: "User already present , Please login or Create new account",
      });
    }
    // creating new user
    const user = await User.create({
      name,
      password,
      email,
    });
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      user: {
        name: user.name,
        lastname: user.lastName,
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
