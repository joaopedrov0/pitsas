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
// Parse URL-encoded bodies (as sent by HTML forms)
    app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/pedido', (req, res) => {
    console.log(req.body)

    connect(add, req.body)

    res.sendFile(__dirname + '/success.html')
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
dotenv --save

*/