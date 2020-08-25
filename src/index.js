import express from 'express'
import cors from 'cors'
import session from 'express-session'
import mongoose from 'mongoose'
import configT from './config/config'
import connectDB from './config/db'
import routes from './api/routes'

const MongoStore = require('connect-mongo')(session)

const env = process.env.NODE_ENV || 'development'
const config = configT[env]

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

connectDB()

const connection = mongoose.connection
const sessionStore = new MongoStore({ 
    mongooseConnection: connection,
    collection: 'sessions'
})

app.use(session({
    secret: 'session secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 //1 day
    }
}))

app.get('/', (req, res) => {
    res.send('Loyalty Program API')
})

app.use('/', routes)

const port = config.PORT || 5000

app.listen(port, () => {
    

    console.log(`Server listening on port: ${port}`)
})