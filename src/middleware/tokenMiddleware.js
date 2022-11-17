require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.checkToken = (req, res, next) => {
  const userHeader = req.headers['authorization']
  const token = userHeader && userHeader.split(' ')[1]

  if (!token) {
    res.status(401).json({ MessageError: 'Access denied!' })
    return
  }

  try {
    const secret = process.env.SECRET
    jwt.verify(token, secret)
    next()
  } catch (e) {
    res.status(400).json({ MessageError: 'Invalid token' })
    return
  }
}
