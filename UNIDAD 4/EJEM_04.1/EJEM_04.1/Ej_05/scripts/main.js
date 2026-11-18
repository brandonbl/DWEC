// Ej_05 · addEventListener(): la forma recomendada
//
//   elemento.addEventListener(tipo, escuchador);

const campoEdad = document.getElementById('edad');
const salida = document.getElementById('salida');

function comprobarEdadNoNegativa() {
  if (campoEdad.value < 0) {
    salida.textContent = 'La edad no puede ser negativa.';
  } else {
    salida.textContent = '';
  }
}

campoEdad.addEventListener(
  'blur',                      // Tipo de evento (sin el prefijo "on")
  comprobarEdadNoNegativa      // Escuchador: la función, SIN paréntesis
);

// Hay un tercer parámetro opcional (las "opciones"). Lo veremos en el ejemplo siguiente.
