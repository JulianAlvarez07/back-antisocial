const { Post, Tag } = require("../db/models")

const createCommentTag = async (req, res) => {
  const { postId, tagId } = req.body
  try {
    const post = await Post.findByPk(postId)
    const tag = await Tag.findByPk(tagId)

    if (!post || !tag) {
      return res.status(404).json({ message: "Post no encontrdo" })
    }
    await post.addTag(tag)
    res.status(200).json({ message: "Tag creado con exito" })
  } catch (error) {
    console.error("Error al crear el tag:", error)
    res.status(500).json({ message: error.message })
  }
}
const deleteCommentTag = async (req, res) => {
  const { postId, tagId } = req.body
  try {
    const post = await Post.findByPk(postId)
    const tag = await Tag.findByPk(tagId)

    if (!post || !tag) {
      return res.status(404).json({ message: "Post no encontrdo" })
    }
    await post.removeTag(tag)
    res.status(200).json({ message: "Tag eliminado con exito" })
  } catch (error) {
    console.error("Error al eliminar el tag:", error)
    res.status(500).json({ message: error.message })
  }
}

const getCommentTags = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findByPk(id, {
      include: [{ model: Tag, as: "tags" }],
    })
    console.log(post)
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" })
    }
    res.status(200).json(post)
  } catch (error) {
    console.error("Error al obtener los tags:", error)
    res.status(500).json({ message: error.message })
  }
}
module.exports = {
  createCommentTag,
  deleteCommentTag,
  getCommentTags,
}
