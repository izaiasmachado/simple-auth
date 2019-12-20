const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../user/user.model')
const { SECRET_KEY, COOKIE_OPTIONS } = process.env

module.exports = {
    async login({ body: { password } }, res) {
        const { user } = res.locals
        const { _id } = user
        const match = await bcrypt.compare(password, user.password)
        user.password = undefined

        if (!match) {
            return res.sendStatus(401)
        }

        jwt.sign({ _id }, SECRET_KEY, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.sendStatus(500)
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
        
        jwt.sign({ _id }, SECRET_KEY, { expiresIn: '1d' }, (err, newToken) => {
            if (err) {
                return res.status(500).json({ cause: err })
            }

            setJwtCookie(res, newToken)
            return res.status(200).json({ user: userInfo })
        })
    }
}

function setJwtCookie(res, jwt) {
    res.header('Set-Cookie', `jwt=${jwt}; ${COOKIE_OPTIONS}`)
}