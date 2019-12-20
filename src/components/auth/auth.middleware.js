const User = require('../user/user.model')

module.exports = {
    async hasBody({ body }, res, next) {
        if (!body) {
            return res.sendStatus(422)
        }

        return next()
    },

    async loadUser({ body }, res, next) {
        const { email } = body
        const user = await User.findOne({ email })

        if (!user) {
            return res.sendStatus(422)
        }

        res.locals = { user }
        return next()
    },

    async hasCookieJwt({ headers: { cookie } }, res, next) {
        if (/jwt/.test(cookie)) {
            return next()
        }

        return res.sendStatus(422)
    }
}