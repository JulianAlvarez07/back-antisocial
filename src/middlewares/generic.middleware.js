const { Post, User, Comment, Tag } = require("../db/models")

const validateId = (req, res, next) => {
  const id = req.params.id
  if (id <= 0) {
    return res
      .status(400)
      .json({ message: "Bad Request: El id no puede ser negativo" })
  }
  next()
}

const existsModelById = (modelo) => {
  return async (req, res, next) => {
    const id = req.params.id
    const data = await modelo.findByPk(id)
    if (!data) {
      return res
        .status(404)
        .json({ message: `El id ${id} no se encuentra registrado` })
    }
    next()
  }
}

const schemaValidator = (schema) => {
  return (req, res, next) => {
    const { error, _ } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      const errores = error.details.map((e) => {
        return { atributo: e.path[0], mensaje: e.message, tipoError: e.type }
      })
      return res.status(400).json({ errores })
    }
    next()
  }
}

const validarUsuario = (campoIdUsuario = "userId") => {
  return async (req, res, next) => {
    const userId = req.body[campoIdUsuario]

    try {
      const user = await User.findByPk(userId)
      if (!user) {
        return res
          .status(404)
          .json({ message: `Usuario con id: ${userId} no encontrado` })
      }
      next()
    } catch (error) {
      return res.status(500).json({
        message: `Error al validar usuario con campo ${campoIdUsuario}`,
        error,
      })
    }
  }
}

const validarPost = async (req, res, next) => {
  const { id } = req.params // id del post
  try {
    const post = await Post.findByPk(id)
    if (!post) {
      return res
        .status(404)
        .json({ message: `Post con id: ${id} no encontrado` })
    }
    next()
  } catch (error) {
    return res.status(500).json({ message: "Error al validar post", error })
  }
}

const validarComentario = async (req, res, next) => {
  const { id } = req.params // id del post
  try {
    const comentario = await Comment.findByPk(id)
    if (!comentario) {
      return res
        .status(404)
        .json({ message: `comentario con id: ${id} no encontrado` })
    }
    next()
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al validar comentario", error })
  }
}

/////// middleware para validar el id de un tag
const validarTag = (campoIdtag = "tagId") => {
  return async (req, res, next) => {
    const tagId = req.body[campoIdtag]

    try {
      const tag = await Tag.findByPk(tagId)
      if (!tag) {
        return res
          .status(404)
          .json({ message: `Tag con id: ${tagId} no encontrado` })
      }
      next()
    } catch (error) {
      return res.status(500).json({
        message: `Error al validar Tag con campo ${campoIdtag}`,
        error,
      })
    }
  }
}
//// middleware para validar el id de un post
const validarPostById = (campoIdPost = "postId") => {
  return async (req, res, next) => {
    const postId = req.body[campoIdPost]

    try {
      const post = await Post.findByPk(postId)
      if (!post) {
        return res
          .status(404)
          .json({ message: `post con id: ${postId} no encontrado` })
      }
      next()
    } catch (error) {
      return res.status(500).json({
        message: `Error al validar post con campo ${campoIdPost}`,
        error,
      })
    }
  }
}

module.exports = {
  existsModelById,
  validateId,
  schemaValidator,
  validarPost,
  validarUsuario,
  validarComentario,
  validarTag,
  validarPostById,
}
