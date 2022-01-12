var { connect, show, add, deleteMany } = require('./model/db')
// Syntax --> connect(function, params)

class PizzaCardapio {
    constructor(nome, normal, broto){
        this.nome = nome,
        this.valor = nome.toLowerCase().replaceAll(' ', '-'),
        this.preco = {
            normal,
            broto
        }
    }
}
                            //(Nome, preço no tamanho NORMAL, preço da BROTO)
var pitsa = new PizzaCardapio("Marguerita", 34.00, 18.00)

// TAREFA: ADICIONAR PIZZAS AO CARDAPIO

connect((params, collection, cardapio) => {cardapio.insertOne(pitsa)}, null)
