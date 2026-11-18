// validaciones.js · Módulo ES6 con funciones de validación.
// Cada función devuelve el mensaje de error, o una cadena vacía si todo es correcto.
// "export" permite usarlas desde otros archivos con "import".

export function validarEdadNoNegativa(edad) {
  if (Number(edad) < 0) {
    return 'La edad no puede ser negativa.';
  }
  return '';
}

export function validarEdadEsNumero(edad) {
  if (edad === '' || isNaN(Number(edad))) {
    return 'La edad debe ser un número.';
  }
  return '';
}
