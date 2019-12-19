const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    }
}

function setJwtCookie(res, jwt) {
    res.header('Set-Cookie', `jwt=${jwt}; ${COOKIE_OPTIONS}`)
}