const User = require('../models/User')

module.exports = {
    async save({ body }, res) {
        try {
            await User.create(body)
            return res.sendStatus(201)
        } catch (error) {
            return res.status(422).json({ 
                message: "Invalid JSON format.",
                cause: error 
            })
        }
    }
}