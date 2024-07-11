const mongoose = require('mongoose')
require('dotenv').config();

const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to mongodb server.')
})

db.on('disconnected', ()=>{
    console.log('Disconnected to mongodb server.')
})

module.exports = db