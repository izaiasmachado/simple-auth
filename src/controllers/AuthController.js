const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { SECRET_KEY, COOKIE_OPTIONS } = process.env

module.exports = {
    async login({ body: { password } }, res) {
        const { user } = res.locals
        const { _id } = user
        const match = await bcrypt.compare(password, user.password)
        user.password = undefined

        if (!match) {
            return res.status(401).json({ message: "Please type a valid password." })
        }

        jwt.sign({ _id }, SECRET_KEY, { expiresIn: '1d' }, (error, token) => {
            if (error) {
                return res.status(500).json({ 
                    message: "Invalid token.", 
                    cause: error
                })
            }

            setJwtCookie(res, token)
            return res.status(200).json({ user })
        })
    },

    async refreshToken({ headers: { cookie } }, res) {
        const token = cookie.match(/jwt=([^;]+)/)[1]
        const { _id } = jwt.verify(token, SECRET_KEY)
        const userInfo = await User.findOne({ _id })
        userInfo.password = undefined
        
        jwt.sign({ _id }, SECRET_KEY, { expiresIn: '1d' }, (error, newToken) => {
            if (error) {
                return res.status(500).json({ 
                    message: "Invalid token.",
                    cause: error 
                })
            }

            setJwtCookie(res, newToken)
            return res.status(200).json({ user: userInfo })
        })
    }
}

function setJwtCookie(res, jwt) {
    res.header('Set-Cookie', `jwt=${jwt}; ${COOKIE_OPTIONS}`)
}