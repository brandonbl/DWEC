// Ej_15 · Pointer Events: un único modelo para ratón, dedo y lápiz
// Son como los eventos de ratón, pero con "pointer": pointerdown, pointermove, pointerup.
// Prueba en una pantalla táctil: el color del trazo cambia según el tipo de puntero.

const lienzo = document.getElementById('lienzo');
const info = document.getElementById('info');
const botonLimpiar = document.getElementById('boton-limpiar');
const contexto = lienzo.getContext('2d');

let dibujando = false;

lienzo.addEventListener('pointerdown', (evento) => {
  dibujando = true;
  // Hace que el canvas siga recibiendo eventos aunque el puntero salga de él
  lienzo.setPointerCapture(evento.pointerId);
  contexto.beginPath();
  contexto.moveTo(evento.offsetX, evento.offsetY);
});

lienzo.addEventListener('pointermove', (evento) => {
  // pointerType vale 'mouse', 'touch' o 'pen'
  info.textContent = 'Tipo de puntero: ' + evento.pointerType;
  if (dibujando) {
    if (evento.pointerType === 'mouse') {
      contexto.strokeStyle = 'blue';
    } else if (evento.pointerType === 'touch') {
      contexto.strokeStyle = 'green';
    } else {
      contexto.strokeStyle = 'red';
    }
    contexto.lineTo(evento.offsetX, evento.offsetY);
    contexto.stroke();
  }
});

lienzo.addEventListener('pointerup', () => {
  dibujando = false;
});

botonLimpiar.addEventListener('click', () => {
  contexto.clearRect(0, 0, lienzo.width, lienzo.height);
});
