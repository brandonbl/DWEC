// Ej_11 · Propiedades del objeto evento
// El navegador pasa automáticamente el objeto evento como primer parámetro del escuchador.

const boton = document.getElementById('boton');
const botonSimular = document.getElementById('boton-simular');
const salida = document.getElementById('salida');

function mostrarEvento(evento) {
  salida.textContent =
    'type: ' + evento.type + '\n' +                        // Tipo de evento: "click"
    'target: ' + evento.target.tagName + '\n' +            // Elemento donde ocurrió
    'currentTarget: ' + evento.currentTarget.tagName + '\n' + // Elemento que tiene el escuchador
    'bubbles: ' + evento.bubbles + '\n' +                  // ¿Sube por el DOM?
    'cancelable: ' + evento.cancelable + '\n' +            // ¿Se puede cancelar con preventDefault()?
    'timeStamp: ' + Math.round(evento.timeStamp) + ' ms\n' +  // Cuándo ocurrió
    'isTrusted: ' + evento.isTrusted;                      // true si lo provocó el usuario
  console.log(evento);                                     // Mira el objeto completo en la consola
}

boton.addEventListener('click', mostrarEvento);

// boton.click() lanza un clic POR CÓDIGO: isTrusted será false
botonSimular.addEventListener('click', () => boton.click());
