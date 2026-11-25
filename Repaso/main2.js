const tareas = [
  { id: 1, descripcion: "Comprar suministros de oficina", completada: false },
  { id: 2, descripcion: "Revisar código del proyecto Beta", completada: true },
  { id: 3, descripcion: "Planificar reunión semanal", completada: false },
  { id: 4, descripcion: "Responder correos urgentes", completada: false }
];

// Ejercicio 1.1
const tareasConNueva = [...tareas, { id: 5, descripcion: "Investigar nueva librería JS", completada: false }]
console.log(tareasConNueva)

// Ejercicio 2.1
const  pendientes = tareas.filter((tarea) => !tarea.completada)

// Ejercicio 2.2
const tareaEspecifica = tareas.find((tarea) => tarea.id === 3)

// Ejercicio 3.1
const tareasActualizadas = tareas.map((tarea) => tarea.id === 4 ? {...tarea, completada: true}: tarea )

// Ejercicio 4.1
const tareasRestantes = tareas.filter((tarea) => tarea.id !== 2)

// Ejercicio 5.1
const pendientesUrgentes = tareas.map((tarea) => { 
  if(tarea.completada === false){
    return {...tarea, completada: true}
  }
  return tarea
}).filter((tarea) => tarea.completada === false)

const descripcionesUrgentes = tareas.map((tarea) => tarea.descripcion)