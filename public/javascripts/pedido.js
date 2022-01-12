document.querySelector('.blocker').addEventListener('click', toggleModal)

document.querySelector('#fazer-pedido button').addEventListener('click', toggleModal)

function toggleModal(e) {
    if(!e.target.classList.contains('allowed')) return

    document.querySelector('.blocker').classList.toggle('closed')
    
}

lastID = 0

var pedidos = []

var sabor0 = document.querySelector('#sabores0')
var sabor1 = document.querySelector('#sabores1')
var borda = document.querySelector('#borda')
var tamanho = document.querySelector('#tamanho')
var pedidoFormulario = document.querySelector('input#pedido')
var carrinho = document.querySelector('.carrinho')

var valorFinal = 0

class Pizza {
    constructor(sabor0, sabor1, borda, tamanho) {
        this.sabor0 = sabor0,
        this.sabor1 = sabor1,
        this.borda = borda,
        this.tamanho = tamanho,
        this.preco0 = cardapio[cardapio.indexOf(cardapio.find(sabor => sabor.nome === this.sabor0))].preco[this.tamanho],
        this.preco1 = cardapio[cardapio.indexOf(cardapio.find(sabor => sabor.nome === this.sabor1))].preco[this.tamanho],
        this.id = lastID + 1,
        this.valor = this.getPreco()
    }

    getPreco(){
        let valorFinal

        if (this.preco0 < this.preco1){
            valorFinal = this.preco1
        } else {
            valorFinal = this.preco0
        }
        if (this.borda === "normal"){
            return valorFinal
        } else {
            valorFinal = valorFinal + 5 // O valor da borda recheada é 5
            this.valor = valorFinal
            return valorFinal
        }
    }

    generateHTML(){
        if (this.sabor0 == this.sabor1){
            return `
                <div class="pizza">
                    <div>
                        <div class="pizza-sabores">Sabores: ${this.sabor0}</div>
                        <div class="pizza-borda">Borda: ${this.borda}</div>
                        <div class="pizza-tamanho">Tamanho: ${this.tamanho}</div>
                        <div class="pizza-preco">Preço: R$${this.valor.toFixed(2)}</div>
                    </div>
                    <div class="delete-btn" onclick="remove(${this.id})"><i class="ri-delete-bin-line"></i></div>
                </div>
            `
        } else {
            return `
                <div class="pizza">
                    <div>
                        <div class="pizza-sabores">Sabores: ${this.sabor0} e ${this.sabor1}</div>
                        <div class="pizza-borda">Borda: ${this.borda}</div>
                        <div class="pizza-tamanho">Tamanho: ${this.tamanho}</div>
                        <div class="pizza-preco">Preço: R$${this.valor.toFixed(2)}</div>
                    </div>
                    <div class="delete-btn" onclick="remove(${this.id})"><i class="ri-delete-bin-line"></i></div>
                </div>
            `
        }
    }

    
}

function remove(pizzaID){
    valorFinal = valorFinal - pedidos[pedidos.indexOf(pedidos.find(pizza => pizza.id === pizzaID))].valor
    pedidos.splice(pedidos.indexOf(pedidos.find(pizza => pizza.id === pizzaID)), 1)
    render()
}

function adicionar(){
    let newPizza = new Pizza(sabor0.value, sabor1.value, borda.value, tamanho.value)
    pedidos.push(newPizza)
    lastID++
    valorFinal += newPizza.valor

    render()
}

sabor0.addEventListener('change', autocomplete)

function autocomplete(){
    sabor1.value = sabor0.value
}

function render(){
    carrinho.innerHTML = ''
    for(let pizza of pedidos){
        carrinho.innerHTML += pizza.generateHTML()
    }
    pedidoFormulario.value = JSON.stringify(pedidos)

    document.querySelector('#valor-final').innerText = `Valor final: R$` + valorFinal.toFixed(2)
    document.querySelector('#preco-form').value = valorFinal.toFixed(2)
}


async function getPizzas(){
    let response = await fetch('/cardapio')

    if(response.ok) {
        let cardapio = await response.json()
        
        return cardapio
    }
}

var cardapio = ''
getPizzas().then(result => {
    cardapio = result

    loadOptions()
    loadCardapio()
})

/*
<select name="sabores0" id="sabores0">
    <option value="" selected disabled>Sabor da pizza</option>
    <option value="calabresa">Calabresa</option>
    <option value="frango com catupiry">Franco com catupiry</option>
    <option value="portuguesa">Portuguesa</option>
    <option value="quatro queijos">Quatro queijos</option>
</select> 
*/

function loadOptions(){
    sabor0.innerHTML = ''
    for(sabor of cardapio){
        sabor0.innerHTML += `
        <option value="${sabor.nome}">${sabor.nome} - R$${sabor.preco.normal} ou R$${sabor.preco.broto}</option>
        `
    }
    sabor1.innerHTML = sabor0.innerHTML
}

function loadCardapio(){}