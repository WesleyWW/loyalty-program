import express from 'express'
import cors from 'cors'
import configT from './config/config'
import connectDB from './config/db'
import routes from './api/routes'

const env = process.env.NODE_ENV || 'development'
const config = configT[env]

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectDB()

app.get('/', (req, res) => {
    res.send('Loyalty Program API')
})
app.use('/', routes)

const port = config.PORT || 5000

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})