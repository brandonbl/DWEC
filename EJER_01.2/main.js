// Importamos las funciones
import mostrarPerfil, {
    crearPerfil,
    esMayorDeEdad,
    obtenerMayoresDeEdad,
    calcularPromedioEdad
} from "./gestorUsuario.js";

// Creamos 5 perfiles
const usuarios = [
    crearPerfil("Brandon", "brandon@gmail.com", 19),
    crearPerfil("Carlos", "carlos@gmail.com", 17),
    crearPerfil("Laura", "laura@gmail.com", 22),
    crearPerfil("Ana", "ana@gmail.com", 16),
    crearPerfil("David", "david@gmail.com", 25)
];

// Obtenemos los usuarios mayores de edad
const mayoresDeEdad = obtenerMayoresDeEdad(usuarios);

// Mostramos los usuarios mayores de edad
console.log("Usuarios mayores de edad:");

mayoresDeEdad.forEach(usuario => {
    console.log(mostrarPerfil(usuario));
});

// Calculamos la edad promedio
const promedioEdad = calcularPromedioEdad(usuarios);

console.log(`La edad promedio de los usuarios es: ${promedioEdad}`);