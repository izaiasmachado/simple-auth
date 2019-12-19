const User = require('./user.model')

module.exports = {
    async userExists({ body }, res, next) {
        const { email } = body
        const userExists = await User.findOne({ email })
        
        if (userExists) {
            return res.sendStatus(409)
        }

        return next()
    }
}