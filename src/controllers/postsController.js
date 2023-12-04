import sql from "../db/index.js";
import { findPost } from "../models/Post.js";

const getAllPosts = async (req, res, next) => {
  const result = await sql`
  SELECT
    id, title, body, post.created_on, post.updated_on, name as user_name, account.sub as user_id
  FROM post left JOIN account
  ON post.sub = account.sub
  ORDER BY post.created_on DESC
  `;

  res.status(200).json(result);
};

const getPostById = async (req, res, next) => {
  const result = await sql`
  SELECT * from post
  WHERE id = ${req.params.id};
  `;

  res.status(200).json(result);
};

const createPost = async (req, res, next) => {
  const result = await sql`
  insert into post (
    title, body, sub, created_on
  ) values (
    ${req.body.title}, ${req.body.body}, ${req.user.sub}, ${req.body.createdAt}
  )
  returning *;
  `;

  res.status(201).json(result[0]);
};

const updatePost = async (req, res, next) => {
  const post = await findPost(req.params.id, req.user.sub);
  if (req.user.sub === post[0].sub) {
    try {
      const result = await sql`
      UPDATE post
      SET title = ${req.body.title},
          body = ${req.body.body},
          updated_on = ${req.body.updated_on}
      WHERE id = ${req.params.id}
      AND sub = ${req.user.sub}
      RETURNING updated_on;
    `;
      if (result.length === 1) {
        res.status(200).json({
          error: false,
          message: "Post updated successfully!",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "Failed to update post. Please try again later.",
        error: true,
      });
    }
  }
};

const deletePost = async (req, res, next) => {
  const post = await findPost(req.params.id, req.user.sub);
  if (req.user.sub === post[0].sub) {
    try {
      const result = await sql`
      DELETE FROM post
      WHERE id = ${req.params.id}
      AND sub = ${req.body.userId}
      RETURNING id;
      `;
      if (result.length === 1) {
        res.status(200).json({
          error: false,
          message: "Post deleted successfully",
        });
      } else {
        throw "Failed to delete the post. Please try again later.";
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "Failed to delete the post. Please try again later.",
        error: true,
      });
    }
  }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
