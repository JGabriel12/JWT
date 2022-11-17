/* 
    Requires
*/
const route = require('express').Router()
const indexController = require('./src/controller/indexController')
const userController = require('./src/controller/userController')

// Index
route.get('/', indexController.index)

// User
route.post('/register', userController.register)

module.exports = route
