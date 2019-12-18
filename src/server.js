const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const server = require('http').Server(app)

const { MONGO_URI, HOST, PORT } = process.env
const routes = require('./routes')

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(PORT, () => console.log(`> Running on http://${HOST}:${PORT}`))