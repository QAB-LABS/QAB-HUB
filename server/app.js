const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

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

const app_name = require('./package.json').name

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
        secret: process.env.SESSION_SECRET || 'irongenerator',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)
require('./passport')(app)

app.use('/api', require('./routes/index'))
app.use('/api', require('./routes/auth'))
app.use('/api/games', require('./routes/games'))

app.use('/api/*', (req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.use((err, req, res, next) => {
    console.error('----- An error happened -----')
    console.error(err)

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
        res.status(err.status || 500)

        // A limited amount of information sent in production
        if (process.env.NODE_ENV === 'production') res.json(err)
        else
            res.json(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))))
    }
})

module.exports = app