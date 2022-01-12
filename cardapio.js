var { connect, show, add, deleteMany } = require('./model/db')
// Syntax --> connect(function, params)

class PizzaCardapio {
    constructor(nome, descricao, normal, broto){
        this.nome = nome,
        this.valor = nome.toLowerCase().replaceAll(' ', '-'),
        this.preco = {
            normal,
            broto
        }
        this.descricao = descricao
    }
}
                            //(Nome, preço no tamanho NORMAL, preço da BROTO)
var pitsa = new PizzaCardapio(
    "Doritos", //Nome
    "muçarela, doritos, cheddar, bacon e azeitonas", //Descrição
    44.00, //Preço normal
    25.00, //Preço da broto
    )

// TAREFA: ADICIONAR PIZZAS AO CARDAPIO

connect((params, collection, cardapio) => {cardapio.insertOne(pitsa)}, null)