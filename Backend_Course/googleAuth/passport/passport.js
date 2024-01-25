const passport = require("passport");
const User = require("../model/User");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "640264277300-7suvsm52tu4linppuv030n2gs3q76ruk.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log("profile", profile._json.email);
      User.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          console.log("user already exist", user);
          cb(null, user);
        } else {
          User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
          })
            .then((user) => {
              console.log("New user registered", user);
              cb(null, user);
            })
            .catch((err) => console.log("error in auth", err));
        }
      });
      //   next();
    }
  )
);

//  {
//       clientID:
//         "640264277300-7suvsm52tu4linppuv030n2gs3q76ruk.apps.googleusercontent.com",
//       clientSecret: "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",
//       callbackURL: "http://localhost:4000/auth/google/callback",
//     }
