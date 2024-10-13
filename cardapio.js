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
    "Quatro queijos", //Nome
    "muçarela, catupiry, parmesão, gorgonzola e azeitonas", //Descrição
    39.00, //Preço normal
    21.00, //Preço da broto
    )

// TAREFA: ADICIONAR PIZZAS AO CARDAPIO

connect((params, collection, cardapio) => {cardapio.insertOne(pitsa)}, null)