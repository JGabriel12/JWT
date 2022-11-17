/* 
    Requires
*/
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
// models
const User = require('./src/model/User')
/* 
    Database connected - emit
*/
mongoose
  .connect(process.env.DB_CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.emit('success')
  })
  .catch(e => console.log(e))

/* 
    JSON config
*/
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

/* 
    API Routes
*/

// index
app.get('/', (req, res) => {
  res.status(200).json({ Message: 'My app test!' })
})

// User
app.post('/user/register', async (req, res) => {
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
    password
  })

  try {
    await user.save()
    res.status(201).json({ Message: 'User created successful' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ Message: 'Failed to create new User in database' })
  }
})

/* 
    Database connected - on
*/
app.on('success', () => {
  app.listen(3000, () => {
    console.log('Server running in http://localhost:3000')
  })
})
