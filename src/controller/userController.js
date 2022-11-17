// models
const User = require('../model/User')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { name, age, email, password, confirmPassword } = req.body

  // Validation

  // Same password
  if (password !== confirmPassword) {
    res.json({ Message: 'Please make sure your passwords match' })
    return
  }
  // Check if user exist
  const userExist = await User.findOne({ email: email })
  if (userExist) {
    res.json({ MessageError: 'This email is already registered' })
    return
  }

  // Password bcrypt
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // Create User
  const user = new User({
    name,
    age,
    email,
    password: passwordHash
  })

  try {
    await user.save()
    res.status(201).json({ Message: 'User created successful' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ Message: 'Failed to create new User in database' })
    return
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  // Validations
  if (!email) return
  if (!password) return

  const user = await User.findOne({ email: email })
  if (!user) {
    res.status(404).json({ Message: 'User not found!' })
    return
  }

  const checkPassword = await bcrypt.compare(password, user.password)
  if (!checkPassword) {
    res.status(422).json({ Message: 'Invalid password!' })
    return
  }

  try {
    const secret = process.env.SECRET

    const token = jwt.sign(
      {
        id: user._id
      },
      secret
    )

    res.status(200).json({ Token: token })
  } catch (e) {
    console.log(e)
    res.status(500).json({ Message: 'Token creation failed' })
    return
  }
}

exports.private = async (req, res, next) => {
  const id = req.params.id
  const user = await User.findById(id, '-password')
  res.json({ User: user })
  if (!user) {
    res.status(404).json({ MessageError: 'User not found!' })
    return
  }
}
