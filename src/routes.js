const express = require('express')
const routes = express.Router()

const prefix = '/api'
routes.get(`${prefix}`, (req, res) => res.json({ message: 'Working fine!' }))

module.exports = routes