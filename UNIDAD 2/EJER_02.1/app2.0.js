import {agregarLibro, obtenerLibro, buscarLibro, eliminarLibro} from './biblioteca2.0.js'

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

console.log("Colección después de añadir el libro:");
console.log(obtenerLibros());