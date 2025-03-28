const mongoose = require('mongoose');
const config = require('../config.json')

async function connectDB() {
    await mongoose.connect(config.connectionString)
        .then((res) => console.log('MongoDB Connected Successfully'))
}

module.exports = connectDB;