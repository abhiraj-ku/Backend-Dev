import User from "../models/userModel.js";

const isEmailVerified = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ "email.address": email });

    // Check if the user exists and if their email is verified
    if (!user || !user.email || !user.email.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Email is not verified yet",
      });
    }

    // If the email is verified, proceed to the next middleware or route handler
    return next();
  } catch (error) {
    console.error("Error in isEmailVerified middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while checking email verification status",
    });
  }
};

export default isEmailVerified;
