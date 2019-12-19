const { login } = require('./auth.controller')
const { hasBody, loadUser } = require('./auth.middleware')

module.exports = (routes, prefix) => {
    routes.post(`${prefix}/login`, hasBody, loadUser, login)
}