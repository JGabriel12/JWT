/* 
    Requires
*/
const route = require('express').Router()
const indexController = require('./src/controller/indexController')
const userController = require('./src/controller/userController')
const { checkToken } = require('./src/middleware/tokenMiddleware')

// Index
route.get('/', indexController.index)

// User

//CRUD
route.post('/register', userController.register)
//Authentication
route.post('/login', userController.login) // Token generate
route.get('/:id', checkToken, userController.private) // Private route

module.exports = route
