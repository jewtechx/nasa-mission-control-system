const express = require('express')

const path = require('path')

const cors = require('cors')

const morgan = require('morgan')

const v1Api = require('./routes/v1')
const app = express()

app.use(cors({
    origin:['http://localhost:3001','http://localhost:3000']
}))
app.use(morgan('combined'))
app.use(express.json())

app.use('/v1',v1Api)

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });   

module.exports = app