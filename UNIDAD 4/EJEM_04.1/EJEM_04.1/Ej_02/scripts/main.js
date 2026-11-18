// Ej_02 · Atributo HTML con el evento "click" en un botón
//
//   <input type="button" value="Comprobar edad" onclick="comprobarEdadNoNegativa()">
//
// Igual que en el Ej_01: en el atributo SÍ se escriben los paréntesis, porque lo que
// hay entre comillas es código JavaScript que se ejecuta cuando ocurre el evento.
// Sigue siendo una forma desaconsejada; la función debe ser global (script clásico).

function comprobarEdadNoNegativa() {
  const salida = document.getElementById('salida');
  const campoEdad = document.getElementById('edad');
  const edad = campoEdad.value;

  if (edad < 0) {
    salida.textContent = 'La edad no puede ser negativa.';
  } else {
    salida.textContent = '';
  }
}
