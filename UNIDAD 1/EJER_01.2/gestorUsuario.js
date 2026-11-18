// Crea un perfil de usuario
export function crearPerfil(nombre, email, edad) {
    return {
        nombre: nombre,
        email: email,
        edad: edad
    };
}

// Comprueba si un usuario es mayor de edad
export function esMayorDeEdad(usuario) {
    return usuario.edad >= 18;
}

// Devuelve solo los usuarios mayores de edad
export function obtenerMayoresDeEdad(usuarios) {
    return usuarios.filter(esMayorDeEdad);
}

// Calcula la edad promedio
export function calcularPromedioEdad(usuarios) {
    const sumaEdades = usuarios.reduce((suma, usuario) => suma + usuario.edad, 0);
    return sumaEdades / usuarios.length;
}

// Muestra la información de un usuario
function mostrarPerfil(usuario) {
    return `Nombre: ${usuario.nombre}, Email: ${usuario.email}, Edad: ${usuario.edad}`;
}

// Exportación por defecto
export default mostrarPerfil;