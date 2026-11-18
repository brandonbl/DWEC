
// Creamos el array de cursos
const cursos = [
    {
    nombre: 'Java',
    profesor: 'Marco',
    estudiantes: [
        {nombre: 'Victor', calificación: 7},
        {nombre: 'Lucas', calificación: 2},
        {nombre: 'Ana', calificación: 9}
    ]
    },

    {
    nombre: 'DAW',
    profesor: 'Elias',
    estudiantes: [
        {nombre: 'Maria', calificación: 4},
        {nombre: 'Luisa', calificación: 8},
        {nombre: 'Iker', calificación: 5}
    ]
    },

    {
    nombre: 'MOC',
    profesor: 'Pablo',
    estudiantes: [
        {nombre: 'Sergio', calificación: 2},
        {nombre: 'Jorge', calificación: 9},
        {nombre: 'Jessica', calificación: 1}
    ]
    },

    {
    nombre: 'Proyecto',
    profesor: 'Kevin',
    estudiantes: [
        {nombre: 'Silvia', calificación: 6},
        {nombre: 'Nel', calificación: 1},
        {nombre: 'Adriana', calificación: 10}
    ]
    }
]

const resumenCursos = cursos.map((curso => {
    let suma = 0;

    curso.estudiantes.forEach(estudiante => {
        suma += estudiante.calificación
    }
    )

    const promedio = suma / curso.estudiantes.length

    return{
        nombreCurso: curso.nombre,
        promedioCalificaciones: promedio
    }
}

))

console.log(resumenCursos)

const cursosDestacados = resumenCursos.filter(curso =>{
    return curso.promedioCalificaciones >= 7
}
)
console.log(cursosDestacados)

cursosDestacados.forEach(curso =>{
    console.log(
        `El curso ${curso.nombreCurso} tiene un promedio de  ${curso.promedioCalificaciones} y es considerado destacado`
    )
}
)

cursos.forEach(curso =>{
    const notaBaja = curso.estudiantes.some(
        estudiantes => estudiante.calificación < 4
    )
}
)

if(notaBaja) {
    console.log(
        `Atención: En el curso ${curso.nombre} hay estudiantes con calificaciones muy bajas`
    )
}