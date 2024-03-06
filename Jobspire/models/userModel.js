import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Is Require"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, " Email is Require"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password is require"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

// Method to hash password before saving the doc to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // try-catch to handle errors properly
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// compare password method
userSchema.method.comparePassword = async function (userPassword) {
  const isPasswordMatching = await bcrypt.compare(userPassword, this.password);
  return isPasswordMatching;
};

// creating a token for validiting
userSchema.methods.createJWT = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

export default mongoose.model("User", userSchema);
