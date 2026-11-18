function recibir(saldo, cantidadRetirar, tieneTrajetaCredito){

if (saldo >= cantidadRetirar){
    let saldoRestante = saldo - cantidadRetirar
    console.log(`Retiro exitoso. Saldo restante: ${saldoRestante}`)
} else if (tieneTrajetaCredito){
    console.log("Saldo insuficiente, pagando con tarjeta de credito")
}else{
console.log("Saldo insuficiente")
}
}

retirarDinero(500, 200, false)
retirarDinero(100, 200, true)
retirarDinero(100, 200, false)