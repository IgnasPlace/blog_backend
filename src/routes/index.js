import express from "express";
const router = express.Router();
import postsRouter from "./postsRouter.js";

router.use("/posts", postsRouter);

export default router;
