//import jwt from 'jsonwebtoken'
const jwt= require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

exports.module = generateToken
