import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import "dotenv/config";
import User, { findUser } from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_API_URL}/auth/google/callback`,
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ profile }, function (err, user) {
        if (err) {
          return done(err, null);
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, callback) {
  // console.log("SERIALIZE ", user);

  callback(null, user);
});

passport.deserializeUser(function (id, callback) {
  // console.log("DESERIALIZE ", id);
  // GET USER FROM THE DATABASE
  findUser(id).then((user) => {
    callback(null, user[0]);
  });
});
