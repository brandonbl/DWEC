const coche = {
marca : 'Mercedes',
modelo : 'A',
año : 2015,
estaDisponible : true
}
 console.table(coche)

 const {marca, modelo} = coche
 console.log(marca)
 console.log(modelo)

 coche.estaDisponible = true
 coche.color = 'Amarillo'
 
 delete coche.año

 console.table(coche)