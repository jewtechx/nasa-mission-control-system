const mongoose = require('mongoose')

const MONGO_URL = 'mongodb+srv://jwlarbi15:SX4roTrlXWBNJ6C9@cluster0.jwrm4jn.mongodb.net/nasa'

mongoose.connection.once('open',() => {
    console.log('Database connection successful...Ready for work')
})

mongoose.connection.on('error', () => {
    console.error('Database connection failed')
})

async function mongoConnect(){
    
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}

async function mongoDisconnect(){
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}