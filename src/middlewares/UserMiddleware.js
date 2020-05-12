const User = require('../models/User')

module.exports = {
    async userExists({ body }, res, next) {
        const { email } = body
        const userExists = await User.findOne({ email })
        
        if (userExists) {
            return res.status(409).json({ message: "User alredy exists." })
        }

        return next()
    }
}