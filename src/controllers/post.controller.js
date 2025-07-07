const { Post, Post_Images, Comment, Tag, User } = require("../db/models");
const { message } = require("../schemas/user.schema");

const getPost = async (req, res) => {
  try {
    console.log("Iniciando búsqueda de posts con todas las relaciones...");

    const posts = await Post.findAll({
      attributes: ["id", "fecha", "contenido", "userId"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "nombre", "nickName", "email"], // Corregido: nickName en lugar de nickname
        },
        {
          model: Post_Images,
          as: "post_images",
          attributes: ["id", "url"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "nombreEtiqueta"], // Corregido: nombreEtiqueta es el nombre correcto
          through: {
            attributes: ["postId", "tagId"],
          },
        },
        {
          model: Comment,
          as: "comment",
          attributes: [
            "id",
            "comentario",
            "fecha",
            "userIdComment",
            "postIdComment",
          ], // Agregados los IDs correctos
          include: {
            model: User,
            as: "user",
            attributes: ["id", "nombre", "nickName", "email"], // Corregido: nickName
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    console.log(`Posts encontrados: ${posts.length}`);

    // Transformamos la respuesta para asegurar que es serializable
    const sanitizedPosts = posts.map((post) => {
      const plainPost = post.get({ plain: true });
      return {
        ...plainPost,
        tags: plainPost.tags || [],
        post_images: plainPost.post_images || [],
        comment: plainPost.comment || [],
      };
    });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: sanitizedPosts,
    });
  } catch (error) {
    console.error("Error al obtener posts:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      message: "Error al obtener los posts",
      error: error.message,
      errorType: error.name,
    });
  }
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
      {
        model: Comment,
        as: "comment",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: User,
          as: "user",
          attributes: ["nombre", "nickname"],
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

  try {
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    // Eliminar comentarios asociados al post
    await Comment.destroy({
      where: {
        postIdComment: id,
      },
    });

    // Eliminar imágenes asociadas al post
    await Post_Images.destroy({
      where: {
        postId: id,
      },
    });

    // Finalmente eliminar el post
    await post.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    res
      .status(500)
      .json({ message: "Error al eliminar el post", error: error.message });
  }
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
