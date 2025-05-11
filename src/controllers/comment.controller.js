const { User, Post, Comment } = require("../db/models");

const getComments = async (req, res) => {
  res.status(200).json(
    await Comment.findAll({
      include: {
        model: User,
        as: "user",
      },
    })
  );
};

const deleteCommentById = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);
  await comment.destroy();
  res.status(204).send();
};

module.exports = {
  getComments,
  deleteCommentById,
};
