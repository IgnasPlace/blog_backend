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
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);
router.route("/failure").get((req, res) => {
  res.send("Something wrong with authentication");
});

export default router;
