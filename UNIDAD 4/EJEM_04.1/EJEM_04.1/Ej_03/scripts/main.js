// Ej_03 · Controlador asignado mediante una PROPIEDAD del DOM (onblur)
//
// Ventaja sobre el atributo HTML: el JavaScript queda separado del HTML.
// El script se carga con type="module", así que se ejecuta cuando el DOM ya está construido.

// (1) Obtenemos los elementos
const campoEdad = document.getElementById('edad');
const salida = document.getElementById('salida');

// (2) Función controladora
function comprobarEdadNoNegativa() {
  if (campoEdad.value < 0) {
    salida.textContent = 'La edad no puede ser negativa.';
  } else {
    salida.textContent = '';
  }
}

// (3) Asignamos la función a la propiedad del evento.
// ⚠️ SIN paréntesis: asignamos la función, no su resultado.
//    campoEdad.onblur = comprobarEdadNoNegativa();   // ¡Error! Se ejecuta ya
campoEdad.onblur = comprobarEdadNoNegativa;
