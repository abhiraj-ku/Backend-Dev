const express = require("express");
const mongoose = require("mongoose");
const app = express();
const auth = require("./routes/auth");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportConfig = require("./passport/passport");

// DB CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/googleAuth")
  .then(console.log("DB CONNECTION SUCCESFULL"))
  .catch((err) => {
    console.log(err);
    console.log("DB CONNECTION FAILED");
    process.exit(1);
  });

// cookie sessions middlewares
app.use(
  cookieSession({
    name: "googleAuth",
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: ["thisisbloodydaddy"], // dotenv
  })
);
// pasport middleware
app.use(passport.initialize());
app.use(passport.session());
// ejs template
app.set("view engine", "ejs");
app.use("/auth", auth);

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }
};

app.get("/", isLoggedIn, (req, res) => {
  res.render("home");
});

app.listen(4000, () => {
  console.log(`Server is listening at port 4000...`);
});
