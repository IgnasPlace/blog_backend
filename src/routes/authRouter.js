import express from "express";
import "../controllers/authController.js";
import passport from "passport";
const router = express.Router();

export function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.route("/google/callback").get(
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/login/failure",
  })
);

router.route("/login/success").get((req, res) => {
  if (req.user) {
    // find user in the database and return as user object
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: {
        name: req.user.name,
        email: req.user.email,
        picture: req.user.picture,
        id: req.user.sub,
      },
    });
  } else {
    res.status(403).json({
      error: true,
      message: "Not Authorised",
    });
  }
});

router.route("/login/failure").get((req, res) => {
  console.log("Login Failed!", req);
  // res.status(401).redirect(process.env.CLIENT_URL + "/login/failed");
  res.status(401).json({
    error: true,
    message: "Login failure",
  });
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

export default router;
