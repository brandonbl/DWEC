// Ej_08 · Varios escuchadores para el mismo evento + importar un módulo ES6

import { validarEdadNoNegativa, validarEdadEsNumero } from './validaciones.js';

const campoEdad = document.getElementById('edad');
const salida = document.getElementById('salida');

function limpiarMensaje() {
  salida.textContent = '';
}

function comprobarNegativa() {
  const mensaje = validarEdadNoNegativa(campoEdad.value);
  if (mensaje !== '') {
    salida.textContent = mensaje;
  }
}

function comprobarNumero() {
  const mensaje = validarEdadEsNumero(campoEdad.value);
  if (mensaje !== '') {
    salida.textContent = mensaje;
  }
}

// Los tres escuchadores se ejecutan en el orden en que se registraron
campoEdad.addEventListener('blur', limpiarMensaje);
campoEdad.addEventListener('blur', comprobarNegativa);
campoEdad.addEventListener('blur', comprobarNumero);

// Nota: si quisiéramos pasar un argumento a una función, habría que envolverla en una flecha:
//   campoEdad.addEventListener('blur', () => miFuncion(campoEdad.value));
// Si escribiéramos miFuncion(campoEdad.value) sin la flecha, se ejecutaría en ese momento.
