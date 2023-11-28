import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import "dotenv/config";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5001/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        // console.log(err, user);
        return done(err, user);
      });

      // console.log(request, accessToken, refreshToken, profile, done);
      // return done(error, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  // console.log("serialiaze", user);

  done(null, user);
});
passport.deserializeUser(function (user, done) {
  // console.log("deserialiaze", user);

  done(null, user);
});
