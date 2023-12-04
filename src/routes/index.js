import express from "express";
const router = express.Router();
import postsRouter from "./postsRouter.js";
import authRouter, { isLoggedIn } from "./authRouter.js";

router.use("/api/v1/posts", isLoggedIn, postsRouter);
router.use("/auth", authRouter);
router.use("/protected", isLoggedIn, (req, res) => {
  res.send("You are logged in");
});

export default router;
