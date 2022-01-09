document.querySelector('.blocker').addEventListener('click', toggleModal)

document.querySelector('#fazer-pedido button').addEventListener('click', toggleModal)
var evento
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

class Pizza {
    constructor(sabor0, sabor1, borda, tamanho) {
        this.sabor0 = sabor0,
        this.sabor1 = sabor1,
        this.borda = borda,
        this.tamanho = tamanho
        this.id = lastID + 1
    }

    generateHTML(){
        if (this.sabor0 == this.sabor1){
            return `
                <div class="pizza">
                    <div>
                        <div class="pizza-sabores">Sabores: ${this.sabor0}</div>
                        <div class="pizza-borda">Borda: ${this.borda}</div>
                        <div class="pizza-tamanho">Tamanho: ${this.tamanho}</div>
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
                    </div>
                    <div class="delete-btn" onclick="remove(${this.id})"><i class="ri-delete-bin-line"></i></div>
                </div>
            `
        }
    }

    
}

function remove(pizzaID){
    pedidos.splice(pedidos.indexOf(pedidos.find(pizza => pizza.id === pizzaID)), 1)
    render()
}

function adicionar(){
    pedidos.push(new Pizza(sabor0.value, sabor1.value, borda.value, tamanho.value))
    lastID++
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
}