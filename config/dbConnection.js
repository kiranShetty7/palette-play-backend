const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const URI = process.env.URI


const connectToDB = async () => {
    console.log(URI, "dscs")
    try {
        const connection = await mongoose.connect(URI, { dbName: 'palette-play' })
        console.log(`Connected to Palatte-play DB on ${connection.connection.host}`)
    }
    catch (error) {
        console.log('Error connecting to the Palatte-play DB', error)
        process.exit(1)
    }
}

module.exports = connectToDB