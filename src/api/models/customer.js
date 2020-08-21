import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    phone: {
        type: String,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
    },
    spent: {
        total: { type: Number, trim: true },
        cycle: { type: Number, trim: true }
    },
    rewardEligible:{
        type: Boolean,
        default: '0'
    }
})

//Spent getters
CustomerSchema.path('spent.total').get((num) => {
    return (num/100).toFixed(2)
})
CustomerSchema.path('spent.cycle').get((num) => {
    return (num/100).toFixed(2)
})
//Spent Setters
CustomerSchema.path('spent.total').set((num) => {
    return (num*100)
})
CustomerSchema.path('spent.cycle').set((num) => {
    return (num*100)
})

const Customer = mongoose.model('Customer', CustomerSchema)
CustomerSchema.plugin(uniqueValidator)
module.exports = Customer