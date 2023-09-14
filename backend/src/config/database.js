require('dotenv').config()
const mongoose = require('mongoose')
const colors = require('colors')
const uri = process.env.MONGODB_URI

// mongoose.connect(uri)
//         .then(() => console.log('Server linked to Database'))
//         .catch((err) => console.log(err))

const connectDatabase = async () => {
    try {
        mongoose.set('strictQuery', false)
        const connect = await mongoose.connect(uri)
        console.log(colors.bold.green(`Database linked to ${connect.connection.host}`));
    } catch (error) {
        console.log(colors.red(error));
    }
}

module.exports = connectDatabase