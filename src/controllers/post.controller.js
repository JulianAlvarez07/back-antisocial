const { Post } = require("../db/models");
const getPost = async (req, res) => {
  res.status(200).json(await Post.findAll());
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  res.status(200).json(post);
};

const createPost = async (req, res) => {
  try {
    const idUser = req.params.id;
    const fechaHoy = new Date();
    const newPost = await Post.create({
      ...req.body,
      fecha: fechaHoy,
      userId: idUser,
    });
    res.status(201).json(newPost);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  if (!post) {
    return res.status(400).json({ message: "Post no encontrado" });
  }
  try {
    await post.update(req.body);
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  await post.destroy();
  res.status(204).send();
};

module.exports = {
  getPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
