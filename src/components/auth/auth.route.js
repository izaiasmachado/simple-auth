const { login, refreshToken } = require('./auth.controller')
const { hasBody, loadUser, hasCookieJwt } = require('./auth.middleware')

module.exports = (routes, prefix) => {
    routes.post(`${prefix}/auth/login`, hasBody, loadUser, login)
    routes.post(`${prefix}/auth/refresh`, hasCookieJwt, refreshToken)
}