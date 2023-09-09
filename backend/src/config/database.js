require('dotenv').config()
const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI

// mongoose.connect(uri)
//         .then(() => console.log('Server linked to Database'))
//         .catch((err) => console.log(err))

const connectDatabase = async () => {
    try {
        mongoose.set('strictQuery', false)
        const connect = await mongoose.connect(uri)
        console.log(`Database linked to ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDatabase