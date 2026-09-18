const producto = {
    nombre : 'movil',
    precio : 1000
}

const cliente = {
    nombreCliente : 'Juan',
    esPremium : true
}

const pedido = {...producto, ...cliente}
console.log(pedido)

const cliente2 = {
  nombre : "Marco"
}

const pedidoSolucion = { ...producto, ...cliente2 }
console.log(pedidoSolucion)