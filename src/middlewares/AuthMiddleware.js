const User = require('../models/User')

module.exports = {
    async hasBody({ body }, res, next) {
        if (!body) {
            return res.status(422).json({ message: "Missing body request." })
        }

        return next()
    },

    async loadUser({ body }, res, next) {
        const { email } = body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(422).json({ message: "Couldn't find this user." })
        }

        res.locals = { user }
        return next()
    },

    async hasCookieJwt({ headers: { cookie } }, res, next) {
        if (/jwt/.test(cookie)) {
            return next()
        }

        return res.status(422).json({ message: "Couldn't find cookie." })
    }
}