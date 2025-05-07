const users = require("../db/data.json")
const { User } = require("../db/models")
const getUsers = async (req, res) => {
  res.status(200).json(await User.findAll())
}

const getUserById = async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ where: { nickName: id } })
  if (!user) {
    return res.status(404).json({ message: `el usuario ${id} no existe` })
  }
  res.status(200).json(user)
}

// a partir de aca no se esta persistiendo, falta cambiar array por modelo User
const createUser = (req, res) => {
  const { nickName, nombre, fechaNacimiento } = req.body
  if (!nickName || !nombre || !fechaNacimiento) {
    return res.status(400).json({ message: "faltan datos" })
  }
  const newUser = { nickName, nombre, fechaNacimiento }
  users.push(newUser)
  res.status(201).json(newUser)
}

const updateUser = (req, res) => {
  const { id } = req.params
  const { nickName, nombre, fechaNacimiento } = req.body
  const userIndex = users.findIndex((user) => user.nickName == id)
  console.log(id, nickName)
  if (userIndex === -1) {
    return res.status(404).json({ message: `el usuario ${id} no existe` })
  }
  const updatedUser = { ...users[userIndex], nickName, nombre, fechaNacimiento }
  users[userIndex] = updatedUser
  res.status(200).json(updatedUser)
}

const deleteUser = (req, res) => {
  const { id } = req.params
  const userIndex = users.findIndex((user) => user.nickName == id)
  if (userIndex === -1) {
    return res.status(404).json({ message: `el usuario ${id} no existe` })
  }
  users.splice(userIndex, 1)
  res.status(204).send()
}
module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser }
