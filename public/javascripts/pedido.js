document.querySelector('.blocker').addEventListener('click', toggleModal)

document.querySelector('#fazer-pedido button').addEventListener('click', toggleModal)
var evento
function toggleModal(e) {
    if(!e.target.classList.contains('allowed')) return

    document.querySelector('.blocker').classList.toggle('closed')
    
}

var pedidosInput = document.querySelector('textarea.pedidos')

var pedidos = []

function adicionar(sabor){
    pedidos.push(sabor)
    renderInput()
}

function renderInput(){
    pedidosInput.value = pedidos.join(', ')
}