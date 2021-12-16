const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

// Configurando a pasta public
    app.use(express.static('public'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

io.on('connection', (socket) => {
    console.log('A user connected')
})

server.listen( 3000, () => {
    console.log('The server is listening the port: 3000')
})


//Dependencias
/*

express --save
socket.io --save


*/