import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: { 
        type: String, 
        trim: true, 
        max: 255 
    },
    lastName: { 
        type: String, 
        trim:true, 
        max: 255 
    },
    email: { 
        type: String, 
        trim:true, 
        max: 255, 
        required: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        }
    },
    password: { 
        type: String,
        trim:true, 
        max: 1024, 
        min: 6,
        sparse: true
    },
    company: {
        type: String,
        trim:true
    },
    customers : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Customer'}
    ]
},{
    timestamps: true
})

const User = mongoose.model('User', UserSchema)
UserSchema.plugin(uniqueValidator)
module.exports = User
