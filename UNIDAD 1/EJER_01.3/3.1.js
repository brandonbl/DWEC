function esContrasenaValida(contrasena) {
  return contrasena.length >= 8;
}

const contrasenas = ['1234', 'miClave2024', 'abc']

//TODO: usa esContrasenaValida como literal de función anónimo
// dentro de un .map() para obtener [false, true, false]
const resultado = contrasenas.map(function(contrasena){
    return esContrasenaValida(contrasena)
}
)

console.log(resultado) // [false, true, false]