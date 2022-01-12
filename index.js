const express = require('express')
const { get } = require('express/lib/response')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

// Conectando banco de dados MongoDB
var { connect, show, add, deleteMany, client } = require('./model/db')
// Syntax --> connect(function, params)
// Tem collection para acessar os pedidos como variável acessível, e cardápio para acessar o cardápio



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

app.get('/cardapio', (req, res) => {
    client.connect(err => {
        if (err) throw err
        client.db("pitsas").collection("cardapio").find().toArray((err, result) => {
            if (err) throw err

            res.end(JSON.stringify(result))
        })
    })
})

io.on('connection', (socket) => {
    console.log('A user connected ', new Date().getMinutes(),':', new Date().getSeconds())
})

server.listen( process.env.PORT || 3000, () => {
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