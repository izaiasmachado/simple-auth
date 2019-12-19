const express = require('express')
const routes = express.Router()

const prefix = '/api'
const userRoute = require('./components/user/user.route')
const authRoute = require('./components/auth/auth.route')

routes.get(`${prefix}`, (req, res) => res.json({ message: 'Working fine!' }))
userRoute(routes, prefix)
authRoute(routes, prefix)

module.exports = routes