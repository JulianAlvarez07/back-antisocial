const { User, Comment } = require("../db/models");

const getComments = async (req, res) => {
  res.status(200).json(
    await Comment.findAll({
      attributes: {
        exclude: ["fechaVisible", "userIdComment"],
      },
      include: {
        model: User,
        as: "user",
        attributes: { exclude: ["nombre", "email", "fechaNacimiento", "edad"] },
      },
    })
  );
};

const deleteCommentById = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);

  await comment.destroy();
  res.status(200).json(comment);
};

const updateCommentById = async (req, res) => {
  const { id } = req.params;
  const { comentario } = req.body;
  const comment = await Comment.findByPk(id);
  await comment.update({ comentario });
  res.status(200).json(comment);
};

module.exports = {
  getComments,
  deleteCommentById,
  updateCommentById,
};
