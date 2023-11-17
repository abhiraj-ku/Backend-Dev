require("dotenv").config();
require("./config/database.js").connect();
const express = require("express");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1> Hello from abhi</h1>");
});

//post route

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All fields are mandatory");
      return; // Add return to exit the function early
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(401).send("User already exists");
      return; // Add return to exit the function early
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    // Token
    const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    user.token = token;
    user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
