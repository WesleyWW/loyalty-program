import mongoose from 'mongoose'
import configT from './config'
const env = process.env.NODE_ENV || 'development'
const config = configT[env]


const connectDB = async () => {
    try {
        const connect = await mongoose.connect(config.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`MongoDB Connected: ${connect.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}


module.exports = connectDB