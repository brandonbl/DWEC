import {agregarLibro, obtenerLibro, buscarLibro, eliminarLibro, calcularTotalPaginas, ordenarPorPaginas} from './biblioteca4.0.js'

console.log("Coleccion inicial")
console.log(obtenerLibro())

const nuevoLibro = {
    id: 11,
    titulo: "El nombre del viento",
    autor: "Patrick Rothfuss",
    paginas: 662
};

agregarLibro(nuevoLibro);



console.log("Libro encontrado")
console.log(buscarLibro(3))

eliminarLibro(3)

console.log("Numero total de paginas")
console.log(calcularTotalPaginas())

console.log("Colección antes de ordenar:");
console.log(obtenerLibros());

ordenarPorPaginas();

console.log("Colección ordenada por páginas:");
console.log(obtenerLibros());

console.log("Colección después de añadir el libro:");
console.log(obtenerLibros());