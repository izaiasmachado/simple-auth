const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const { SALT_ROUNDS } = process.env

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

UserSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    return emailRegex.test(email)
})

async function bcryptPassword(next) {
    if (this.isModified('password')) {
        try {
            const hash = await bcrypt.hash(this.password, Number(SALT_ROUNDS))
            this.password = hash;
        } catch (error) {
            return next(error)
        }
    }

    return next()
}

UserSchema.pre('save', bcryptPassword)

module.exports = model('Users', UserSchema)