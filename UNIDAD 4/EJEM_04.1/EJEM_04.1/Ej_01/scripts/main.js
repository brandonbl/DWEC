// Ej_01 · Controlador de eventos en un ATRIBUTO HTML
//
//   <input id="edad" type="number" value="0" onblur="comprobarEdadNoNegativa()">
//
// ⚠️ Forma DESACONSEJADA (solo para conocerla):
//    - Mezcla HTML (estructura) con JavaScript (comportamiento).
//    - Una política CSP estricta (Content-Security-Policy) bloquea estos atributos.
//    - Exige que la función sea GLOBAL. Por eso este ejemplo usa un <script> clásico:
//      si se cargara con type="module", la función quedaría en el ámbito del módulo
//      y el atributo lanzaría "ReferenceError: comprobarEdadNoNegativa is not defined".

function comprobarEdadNoNegativa() {
  const salida = document.getElementById('salida');       // Contenedor del mensaje
  const campoEdad = document.getElementById('edad');      // Campo de entrada de la edad
  const edad = campoEdad.value;                           // Valor actual (cadena de texto)

  if (edad < 0) {                                         // Si el valor es negativo...
    salida.textContent = 'La edad no puede ser negativa.'; // ...mostramos un error...
  } else {                                                // ...y si no...
    salida.textContent = '';                              // ...borramos el mensaje.
  }
}
