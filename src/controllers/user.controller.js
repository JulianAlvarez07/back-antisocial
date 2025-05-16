const { User } = require("../db/models");

const getUsers = async (req, res) => {
  res.status(200).json(await User.findAll());
};

const getUserByNickName = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }
  try {
    await user.update(req.body);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const deleteUserByNickName = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  await user.destroy();
  res.status(204).send();
};

module.exports = {
  getUsers,
  getUserByNickName,
  createUser,
  updateUser,
  deleteUserByNickName,
};
