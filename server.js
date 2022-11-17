/* 
    Requires
*/
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()

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

app.get('/', (req, res) => {
  res.status(200).json({ Message: 'My app test!' })
})

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
    Database connected - on
*/
app.on('success', () => {
  app.listen(3000, () => {
    console.log('Server running in http://localhost:3000')
  })
})
