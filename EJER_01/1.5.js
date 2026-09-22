
//Esto es para crear array con objetos
const estudiantes = [
    {nombre: 'Pablo', apellidos: 'Lopez', calificación: 6, aprobado: true},
    {nombre: 'Marcos', apellidos: 'Díaz', calificación: 8, aprobado: true},
    {nombre: 'Ana', apellidos: 'Castellanos', calificación: 3, aprobado: false},
]

// map() sirve para recorrer un array y crear otro array a partir de él.
const estudiantesID = estudiantes.map((estudiante, indice) => {
    return{
        ...estudiante,
        id: indice +1
    }
}
)

//Esto se usa para filtrar los estudiantes con calificación mayor a 5
const aprobados = estudiantesID.filter( estudiante => estudiante.calificación >= 5)


// Aquí usamos forEach() para recorrer los estudiantes aprobados
aprobados.forEach(estudiante => {
    console.log(
        `Felicidades ${estudiante.aprobados}, has aprobado con ${estudiante.calificación}`  
    )
}
)

// Recorre el array original y verifica si el valor de la propiedad aprobado es coherente
estudiantes.forEach(estudiante => {
    const estarAprobado = estudiante.calificación >=5

    if(estudiante.aprobado !== estarAprobado){
        console.log(`Incoherencia en el registro de ${estudiante.nombre}: Calificación = ${estudiante.calificación} aprobado = ${estudiante.aprobado}`)
    }
} 
)

