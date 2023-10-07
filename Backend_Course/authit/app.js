require("dotenv").config();
require("./config/database.js").connect();
const express = require("express");
const User = require("./model/user");
const bcrypt = require("bcryptjs");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1> Hello from abhi</h1>");
});

//post route

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!(email && password && firstName && lastName)) {
    res.status(400).send("all fields are mandatory");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(401).send("User already exist");
  }

  const encypPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password: encypPassword,
  }).then();
});

module.exports = app;
