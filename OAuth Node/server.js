const fs = require("fs");
const path = require("path");
const https = require("https");
const helmet = require("helmet");
const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const { Strategy } = require("passport-google-oauth20");
const { error } = require("console");

require("dotenv").config();
const app = express();
const PORT = 3000;

const roles = {
  ADMIN: "admin",
  USER: "user",
};
const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};
function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google Profile", profile);
  // Check for any errors that occurred during authentication
  // For example, if profile is null or undefined, it indicates an authentication failure
  if (!profile) {
    return done(new Error("Authentication failed"));
  }
  const userRole =
    profile.emails && profile.emails[0].value === "admin@example.com"
      ? roles.ADMIN
      : roles.USER;

  // Pass user profile and role to the next middleware
  done(null, { profile, role: userRole });
}
// Passport strategy
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

//serialize
passport.serializeUser((user, done) => {
  done(null, { id: user.id, role: user.role });
});

//deserialize
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(helmet());
app.use(
  cookieSession({
    name: "session_info",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);
app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});
app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
  console.log("current user is :", req.user);
  let loggedIn = req.isAuthenticated() && req.user;
  if (!loggedIn) {
    res
      .status(401)
      .json({ error: "You must login first to access the secret!" });
  }
  next();
}
function checkRole(role) {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role == role) {
      return next();
    }
    res.status(403).json({ error: "lawde bhag yaha se" });
  };
}
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/failure",
    session: true,
  }),
  (req, res) => {
    console.log("Google called us back");
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("An error occurred:", err.message);
  // Redirect to the failure route in case of authentication failure
  res.redirect("/failure");
});

// Logging middleware

app.get("/secret", checkLoggedIn, (req, res) => {
  res.send("Your personal secret value is 42!");
});
app.get("/failure", (req, res) => {
  res.send("Failed to log in with Google!");
});
app.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send("Internal Server Error");
    }
    // Redirect the user to the home page after logout
    // res.clearCookie("session_info");
    return res.redirect("/");
  });
});
app.get("/auth/user", checkRole(roles.USER), (req, res) => {
  res.sendFile(path.join(__dirname, "public", "fk.jpg"));
});
app.get("/auth/admin", checkRole(roles.ADMIN), (req, res) => {
  res.sendFile(path.join(__dirname, "public", "mm.jpg"));
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
