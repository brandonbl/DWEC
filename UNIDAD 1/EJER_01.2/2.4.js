const usuario = {
nombre: "Paco",
email: "pacoPRO123@gmail.com"
}

const perfil = {
    puesto: "programador",
    empresa: "Adove"
}

const empleado = {
    ...usuario, 
    perfil: {...perfil} 
}

const ciudad = empleado.perfil?.direccion?.ciudad
const ciudadFinal = ciudad ?? "ciudad no encontrada"

console.log(empleado); 
console.log("Ciudad:", ciudadFinal)