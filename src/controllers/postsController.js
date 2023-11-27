const getAllPosts = (req, res, next) => {
  res.send("Get all posts endpoint");
};
const getPostById = (req, res, next) => {
  const id = req.params.id;
  res.send(id);
};
const createPost = (req, res, next) => {
  res.send("Create post");
};
const updatePost = (req, res, next) => {
  res.send("Update post");
};
const deletePost = (req, res, next) => {
  res.send("Delete post");
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
