const { save } = require('./user.controller')
const { userExists } = require('./user.middleware')

module.exports = (routes, prefix) => {
    routes.post(`${prefix}/user`, userExists, save)
}