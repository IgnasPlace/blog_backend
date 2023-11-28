import sql from "../db/index.js";

const getAllPosts = async (req, res, next) => {
  const result = await sql`
  SELECT * from post
  ORDER BY created_on DESC
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
    title, body, user_id, created_on
  ) values (
    ${req.body.title}, ${req.body.body}, ${req.body.userId}, ${req.body.createdAt}
  )
  returning *;
  `;

  res.status(201).json(result[0]);
};

const updatePost = async (req, res, next) => {
  if (req.body.id === +req.params.id) {
    const result = await sql`
      UPDATE post
      SET title = ${req.body.title},
          body = ${req.body.body},
          updated_on = ${req.body.updatedAt}
      WHERE id = ${req.params.id}
      AND user_id = ${req.body.userId};
  `;

    res.status(200).json(result);
  }
};

const deletePost = async (req, res, next) => {
  const result = await sql`
  DELETE FROM post
  WHERE id = ${req.params.id}
  AND user_id = ${req.body.userId};
  `;

  res.status(200).json(result);
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
