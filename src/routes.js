const express = require('express')
const routes = express.Router()

const prefix = '/api'

const { save } = require('./controllers/UserController')
const { userExists } = require('./middlewares/UserMiddleware')

const { hasBody, loadUser, hasCookieJwt } = require('./middlewares/AuthMiddleware')
const { login, refreshToken } = require('./controllers/AuthController')

routes.get(`${prefix}`, (req, res) => res.json({ message: 'Working fine!' }))
routes.post(`${prefix}/auth/login`, hasBody, loadUser, login)
routes.post(`${prefix}/auth/refresh`, hasCookieJwt, refreshToken)
routes.post(`${prefix}/user`, userExists, save)

module.exports = routes