// models
const User = require('../model/User')
const bcrypt = require('bcrypt')

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
  }
}
