const libros = [
    { id: 1, titulo: "1984", autor: "George Orwell", paginas: 328 },
    { id: 2, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", paginas: 96 },
    { id: 3, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", paginas: 863 },
    { id: 4, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", paginas: 417 },
    { id: 5, titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", paginas: 309 },
    { id: 6, titulo: "La Odisea", autor: "Homero", paginas: 448 },
    { id: 7, titulo: "Drácula", autor: "Bram Stoker", paginas: 418 },
    { id: 8, titulo: "Frankenstein", autor: "Mary Shelley", paginas: 280 },
    { id: 9, titulo: "El Hobbit", autor: "J.R.R. Tolkien", paginas: 310 },
    { id: 10, titulo: "Orgullo y prejuicio", autor: "Jane Austen", paginas: 432 }
];

function agregarLibro(nuevoLibro){
    libros.push(nuevoLibro)
}

function obtenerLibros(){
    return libros
}
function buscarLibro(id){
    return libros.find(libro => libro.id ===id)
}

function eliminarLibro(id){
    const indice = libros.findIndex(libro => libro.id ===id)
    if (indice !== -1){
        libros.splice(indice, 1)
    }
}

function calcularTotalPaginas(){
    return libros.reduce((total, libros) => total + libros.paginas, 0)
}
function ordenarPorPaginas() {
    libros.sort((a, b) => a.paginas - b.paginas);
}

function hayLibrosLargos(limitePaginas){
return libros.some((libro) => libro.paginas > limitePaginas)
}

function todosSonLibrosCortos(limitePaginas){
    return libros.every((libro) => libro.paginas < limitePaginas)
}


export{agregarLibro, obtenerLibros, buscarLibro, eliminarLibro, calcularTotalPaginas, ordenarPorPaginas, hayLibrosLargos, todosSonLibrosCortos}