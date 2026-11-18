const nombre = 'Brandon'
let edad = 19
const tieneMascota = true

edad = 20
let tieneMascota2 = false

console.log('Mi nombre es: ' + nombre + '--tipo--' + typeof nombre)
console.log('Mi edad son: ' + edad + ' años' + '--tipo--' + typeof edad)
console.log('Tiene mascota: ' + tieneMascota + '--tipo--'+ typeof tieneMascota)

const frase = `${nombre} tiene ${edad} años y ${tieneMascota ? 'si' : 'no'} tiene mascota `
console.log(frase)