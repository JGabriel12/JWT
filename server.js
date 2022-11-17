/* 
    Requires
*/
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routes = require('./routes')

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
app.use('/', routes)

// User
app.use('/user', routes)

/* 
    Database connected - on
*/
app.on('success', () => {
  app.listen(3000, () => {
    console.log('Server running in http://localhost:3000')
  })
})
