// Ej_09 · Eliminar escuchadores con removeEventListener()
//
// Para quitar un escuchador hace falta una función CON NOMBRE: removeEventListener()
// necesita recibir la misma función que se pasó a addEventListener().

import { validarEdadNoNegativa, validarEdadEsNumero } from './validaciones.js';

const campoEdad = document.getElementById('edad');
const casillaValidar = document.getElementById('validacion');
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

function activarValidacion() {
  campoEdad.addEventListener('blur', comprobarNegativa);
  campoEdad.addEventListener('blur', comprobarNumero);
}

function desactivarValidacion() {
  campoEdad.removeEventListener('blur', comprobarNegativa);
  campoEdad.removeEventListener('blur', comprobarNumero);
}

campoEdad.addEventListener('blur', limpiarMensaje);   // Este se queda siempre
activarValidacion();                                  // La casilla empieza marcada

// El evento "change" de una casilla se dispara al marcarla o desmarcarla
casillaValidar.addEventListener('change', () => {
  if (casillaValidar.checked) {
    activarValidacion();
  } else {
    desactivarValidacion();
    limpiarMensaje();
  }
});
