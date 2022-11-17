const mongoose = require('mongoose')

const User = mongoose.model('User', {
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String }
})

module.exports = User
