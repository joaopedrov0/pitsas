require('dotenv').config()
const { MongoClient, Db } = require('mongodb');
const uri = process.env.URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
   
/*

const dbManager = {
    connect: (func, params) => {
        client.connect(err => {
            if(err) throw err
            const collection = client.db("pitsas").collection("pedidos")
            
            this.func(params, collection)
        })
    },
    show: (params, collection) => {
    
        collection.find().toArray().then(result => {console.log(result)})
        
    },
    add: (params, collection) => {
        collection.insertOne(params).then(() => {
            if (show) connect(show, null)
        })
    },
    deleteMany: (filter, collection) => {
        collection.deleteMany(filter).then(() => {
            if (show) connect(show, null)
        })
    }
}

*/
//module.exports = dbManager

function connect(func, params){
    client.connect(err => {
        if(err) throw err
        const collection = client.db("pitsas").collection("pedidos")
        
        func(params, collection)
    })
}

function show(params, collection) {
    
    collection.find().toArray().then(result => {console.log(result)})
    
}

function add(params, collection){
    collection.insertOne(params).then(() => {
        if (show) connect(show, null)
    })
}
//filter === params
function deleteMany(filter, collection){
    collection.deleteMany(filter).then(() => {
        if (show) connect(show, null)
    })
}

//connect(show, null)
module.exports = {
    connect,
    show,
    add,
    deleteMany
}