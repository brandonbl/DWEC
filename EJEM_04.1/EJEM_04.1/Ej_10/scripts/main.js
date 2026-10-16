// Ej_10 · target frente a currentTarget (y this)
//
//   <div id="caja">            ← currentTarget: el elemento que TIENE el escuchador
//     <p>
//       <button id="boton">    ← target: el elemento donde ocurrió el evento (el más interno)
//
// El evento "click" burbujea: sube desde el botón hasta la caja, donde está el escuchador.

const caja = document.getElementById('caja');
const salida = document.getElementById('salida');

// Con una función CLÁSICA (function), this es lo mismo que evento.currentTarget
caja.addEventListener('click', function (evento) {
  salida.textContent =
    'target (donde pulsaste): ' + evento.target.tagName + '\n' +
    'currentTarget (quien escucha): ' + evento.currentTarget.id + '\n' +
    'this (quien escucha): ' + this.id;
});

// Nota: con una función flecha, this NO vale lo mismo. Por eso, con flechas,
// usamos siempre evento.currentTarget.
