document.querySelector('.blocker').addEventListener('click', toggleModal)

document.querySelector('#fazer-pedido button').addEventListener('click', toggleModal)

function toggleModal(e) {
    console.log(e)
    if(!e.target.classList.contains('blocker') & e.path[0] != 'button' ) return

    document.querySelector('.blocker').classList.toggle('closed')
}

