const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");
const helmet = require("helmet");

require("dotenv").config();

const app = express();
const PORT = 3000;
app.use(helmet());

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
