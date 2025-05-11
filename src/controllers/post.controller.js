const { Post, Post_Images, Comment, User } = require("../db/models");
const getPost = async (req, res) => {
  res.status(200).json(await Post.findAll());
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Post_Images,
        as: "post_images",
      },
    ],
  });
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
    console.log(e);
    res.status(400).json({ error: e });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  await post.destroy();
  res.status(204).send();
};

const createImageByPost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByPk(id);
  if (!post) {
    return res.status(400).json({ message: "Post no encontrado" });
  }
  try {
    post_image = await Post_Images.create({ ...req.body, postId: id });
    res.status(201).json(post_image);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

const createCommentByPost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByPk(id);
  if (!post) {
    return res.status(400).json({ message: "Post no encontrado" });
  }
  try {
    post_comment = await Comment.create({
      ...req.body,
      postIdComment: id,
      //el usuario tiene que ser el que creo el comentario. lo de abajo esta mal
      userIdComment: post.userId,
    });
    res.status(201).json(post_comment);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

module.exports = {
  getPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  createImageByPost,
  createCommentByPost,
};
