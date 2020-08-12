import express from 'express'
import cors from 'cors'

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Loyalty Program API')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})