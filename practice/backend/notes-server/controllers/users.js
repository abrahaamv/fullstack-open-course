const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  users
    ? res.json(users)
    : res.status(404).end()
})

userRouter.post('/', async (req, res) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt
})

module.exports = userRouter
