const { Post, Post_Images, Comment, Tag } = require("../db/models");
const { message } = require("../schemas/user.schema");
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
      {
        model: Tag,
        as: "tags",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        through: {
          attributes: ["postId", "tagId"],
        },
      },
    ],
  });
  res.status(200).json(post);
};

const createPost = async (req, res) => {
  const { fecha, contenido, userId } = req.body;

  try {
    const newPost = await Post.create({ fecha, contenido, userId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post", error });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
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
  try {
    const post_image = await Post_Images.create({ ...req.body, postId: id });
    res.status(201).json(post_image);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

const createCommentByPost = async (req, res) => {
  const { id } = req.params;
  const { comentario, fecha, userIdComment } = req.body;

  try {
    const comment = await Comment.create({
      comentario,
      fecha,
      postIdComment: id,
      userIdComment,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el comentario", error });
  }
};

const addImage = async function (req, res) {
  const { id } = req.params;
  const { url, userId } = req.body;
  try {
    const newImage = await Post_Images.create({
      url,
      userId: userId,
      postId: id,
    });
    res.status(201).json({
      message: "Imagen añadida correctamente",
      image: newImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al añadir imagen", error });
  }
};

const deleteImage = async (req, res) => {
  try {
    await req.image.destroy();
    res.status(200).json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la imagen", error });
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
  addImage,
  deleteImage,
};
