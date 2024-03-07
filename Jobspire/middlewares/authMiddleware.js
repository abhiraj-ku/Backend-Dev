import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) {
    return next(new Error("Authorization token is missing"));
  }
  try {
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id);
    if (!req.user) {
      return next(new Error("User not found"));
    }
    next();
  } catch (error) {
    next(new Error("Authentication failed"));
  }
};

export default userAuth;
