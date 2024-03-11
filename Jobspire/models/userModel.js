import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
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
      address: {
        type: String,
        required: [true, " Email is Required"],
        unique: [true, "Email should be unique"],
        validate: validator.isEmail,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
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
    emailVerificationToken: String,
    emailTokenExpiry: String,
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
userSchema.methods.comparePassword = async function (userPassword) {
  const isPasswordMatching = await bcrypt.compare(userPassword, this.password);
  return isPasswordMatching;
};

// creating a token for validiting
userSchema.methods.createJWT = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

userSchema.methods.emailToken = function () {
  const emailtoken = crypto.randomBytes(20).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(emailtoken)
    .digest("hex");

  // 5 min for the token
  this.emailTokenExpiry = Date.now() * 5 * 60 * 1000;
  return emailtoken;
};

export default mongoose.model("User", userSchema);
