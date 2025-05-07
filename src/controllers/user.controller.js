const users = require("../db/data.json")
const { User } = require("../db/models")
const getUsers = async (req, res) => {
  res.status(200).json(await User.findAll())
}

const getUserByNickName = async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ where: { nickName: id } })
  if (!user) {
    return res.status(404).json({ message: `el usuario ${id} no existe` })
  }
  res.status(200).json(user)
}

// a partir de aca no se esta persistiendo, falta cambiar array por modelo User
const createUser = async (req, res) => {
  try {
    await User.create(req.body)
    res.status(200).json(req.body, "Usuario creado")
  } catch (error) {
    res.status(400).json({ messge: "Error al crear el usuario" })
  }
}
const updateUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ where: { nickName: id } })
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" })
  }
  try {
    await user.update(req.body)
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: "Error al actualizar usuario" })
  }
}

const deleteUserByNickName = async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ where: { nickName: id } })
  await user.destroy()
  res.status(204).send()
}
module.exports = {
  getUsers,
  getUserByNickName,
  createUser,
  updateUser,
  deleteUserByNickName,
}
