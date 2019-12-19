const User = require('./user.model')

module.exports = {
    async save({ body }, res) {
        try {
            await User.create(body)
            return res.sendStatus(201)
        } catch (error) {
            return res.sendStatus(422)
        }
    }
}