const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const app_name = require('./package.json').name
const version = require('./package.json').version
const emoji = require('node-emoji')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const nocache = require('nocache')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

require('./configs/database')

var rocket = emoji.get('rocket')
var pizza = emoji.get('pizza')
console.log(pizza + rocket + rocket + rocket + `    Welcome to the BoardGameSilo API - v${version}     ` + rocket + rocket + rocket + pizza)

const app = express()

app.use(nocache())
app.use(
    cors({
        origin: (origin, cb) => {
            cb(null, process.env.NODE_ENV !== 'production')
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../client/build')))

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default-secret-not-secure',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)
require('./passport')(app)

app.use('/api', require('./routes/auth'))
app.use('/api/reviews', require('./routes/reviews'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/comments', require('./routes/comments'))
app.use('/api/games', require('./routes/games'))
app.use('/api/prices', require('./routes/prices'))
app.use('/api/merchants', require('./routes/merchants'))
app.use('/api/users', require('./routes/users'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/likes', require('./routes/likes'))

app.use('/api/*', (req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    console.error(err)
    if (!res.headersSent) {
        res.status(err.status || 500)
        if (process.env.NODE_ENV === 'production') res.json(err)
        else res.json(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))))
    }
})

module.exports = app