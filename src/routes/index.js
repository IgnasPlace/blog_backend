import express from "express";
const router = express.Router();
import postsRouter from "./postsRouter.js";

router.use("/api/v1/posts", postsRouter);

export default router;
