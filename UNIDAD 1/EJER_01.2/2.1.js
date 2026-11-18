const numeros = [1, 2, 3, 4, 5, 6, 7]

const dobles = numeros.map(numero => numero * 2)
const pares = numeros.filter(numero => numero % 2===0)

for (const numero of pares){
    console.log(numero)
}