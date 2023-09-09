const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    }, 
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = mongoose.model('Users', UserSchema)