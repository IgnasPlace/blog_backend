import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postsController.js";
import { isLoggedIn } from "./authRouter.js";
const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPostById).patch(updatePost).delete(deletePost);

export default router;
