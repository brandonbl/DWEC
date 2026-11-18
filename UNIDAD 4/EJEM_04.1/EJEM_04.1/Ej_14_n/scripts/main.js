// Ej_14 · Dibujar con el ratón sobre un <canvas>
// Se dibuja solo mientras el botón izquierdo está pulsado.

const lienzo = document.getElementById('lienzo');
const botonLimpiar = document.getElementById('boton-limpiar');
const contexto = lienzo.getContext('2d');   // Herramienta para dibujar en 2D

let dibujando = false;                      // ¿Estamos dibujando ahora mismo?

// Al pulsar el botón: empieza un trazo en la posición del puntero
lienzo.addEventListener('mousedown', (evento) => {
  dibujando = true;
  contexto.beginPath();
  contexto.moveTo(evento.offsetX, evento.offsetY);
});

// Al mover el ratón: si estamos dibujando, añadimos un trozo de línea
lienzo.addEventListener('mousemove', (evento) => {
  if (dibujando) {
    contexto.lineTo(evento.offsetX, evento.offsetY);   // offsetX/Y: posición dentro del canvas
    contexto.stroke();
  }
});

function terminarTrazo() {
  dibujando = false;
}

lienzo.addEventListener('mouseup', terminarTrazo);       // Al soltar el botón
lienzo.addEventListener('mouseleave', terminarTrazo);    // Si el puntero sale del canvas

botonLimpiar.addEventListener('click', () => {
  contexto.clearRect(0, 0, lienzo.width, lienzo.height);
});
