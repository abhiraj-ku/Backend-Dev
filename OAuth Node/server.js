const fs = require("fs");
const path = require("path");
const https = require("https");
const helmet = require("helmet");
const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

require("dotenv").config();
const app = express();
const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};
function verifyCallback(accessToken, refreshToken, profile, done) {}
// Passport strategy
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

app.use(helmet());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/auth/google", (req, res) => {
  res.send("Google OAuth app consent screen");
});

app.get("/secret", (req, res) => {
  res.send("Your personal secret value is 42!");
});

app.get("/failure", (req, res) => {
  res.send("Failed to log in!");
});
try {
  const server = https.createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  );

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
} catch (error) {
  console.error("Error starting HTTPS server:", error);
}

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}...`);
// });
