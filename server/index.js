const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const socketManage = require('./socketManage')(io)
const PORT = process.env.PORT || 4000
const path = require('path')
const mongoose = require('mongoose');

mongoose.connect(
    "mongodb://localhost:27017/",
    {
        dbName:'star',
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => 
        err ? console.log(err) : console.log('Connected to star DB')
);


io.on('connection', socketManage )
// In dev mode just hide hide app.uss(... ) below
app.use( express.static(path.join(__dirname, '../build')))
server.listen( PORT, () => console.log('App was start at port : ' + PORT ))
