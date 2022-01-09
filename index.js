const express = require('express')
const { get } = require('express/lib/response')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

// Conectando banco de dados MongoDB
var { connect, show, add, deleteMany } = require('./model/db')
// Syntax --> connect(function, params)


// Configurando a pasta public
    app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('A user connected ', new Date().getMinutes(),':', new Date().getSeconds())
})

server.listen( 3000, () => {
    console.log('The server is listening the port: 3000')
})


//Dependencias
/*

express --save
socket.io --save
pug --save   --->   UNINSTALL
mongodb --save

*/