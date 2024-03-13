import User from "../models/userModel.js";
import sendEmail from "../utils/sendMail.js";
import zxcvbn from "zxcvbn";
// Register Route
export const registerRoute = async (req, res) => {
  try {
    const { name, lastName, email, password, location } = req.body;

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
    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 6 characters long",
      });
    }
    const pass = password;
    const result = zxcvbn(pass);

    console.log(result.score);
    console.log(result.feedback.warning);
    console.log(result.feedback.suggestions);

    // creating new user
    const user = await User.create({
      name,
      password,
      lastName,
      email: {
        address: email,
      },
      location,
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

  try {
    const user = await User.findOne({ "email.address": email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // if email is already verified
    if (user.email.isVerified) {
      return res.status(201).send({
        message: "Email is already verified , Login now ",
      });
    }

    const emailToken = user.emailToken();
    // console.log(emailToken);
    // user.emailVerificationToken = emailToken;

    const emailUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/verify-email/${emailToken}`;

    const message = `Copy the token to get your email verified : ${emailUrl}`;

    const emailObject = {
      mail: user.email.address,
      subject: "Email verification token ",
      message: message,
    };

    await sendEmail(emailObject);
    return res.status(200).send({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email token controller error:", error);

    return res.status(500).send({
      success: false,
      message: "Error occurred while sending email",
    });
  }
};

// Verify token route
export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  const { email } = req.body;
  console.log(token);

  try {
    // Find the user by email
    const user = await User.findOne({ "email.address": email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if token is missing
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is missing",
      });
    }
    user.emailVerificationToken = token;
    // console.log(user.emailVerificationToken);

    // Check if the provided token matches the email verification token
    if (user.emailVerificationToken != token) {
      return res.status(403).json({
        success: false,
        error: "Invalid email verification token",
      });
    }

    // Check if the token has expired
    if (user.emailTokenExpiry < Date.now()) {
      return res.status(403).json({
        success: false,
        error: "Email verification token has expired",
      });
    }

    // Mark the email as verified
    user.email.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Email token verification controller error:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while verifying email",
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

    const user = await User.findOne({ "email.address": email });
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
    user.emailVerificationToken = undefined;

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
