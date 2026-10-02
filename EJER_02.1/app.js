import {agregarLibro, obtenerLibro} from './biblioteca.js'

console.log("Coleccion inicial")
console.log(obtenerLibro())

const nuevoLibro = {
    id: 11,
    titulo: "El nombre del viento",
    autor: "Patrick Rothfuss",
    paginas: 662
};

agregarLibro(nuevoLibro);

console.log("Colección después de añadir el libro:");
console.log(obtenerLibros());