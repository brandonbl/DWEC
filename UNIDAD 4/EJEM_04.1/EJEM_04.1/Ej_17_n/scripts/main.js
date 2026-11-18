// Ej_17 · Mover un círculo con las flechas del teclado (y con WASD)
//
//  - Flechas → evento.key  ('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight')
//  - WASD    → evento.code ('KeyW', 'KeyA', 'KeyS', 'KeyD'): importa la POSICIÓN de la tecla
//  - preventDefault() evita que las flechas desplacen la página.

const circulo = document.getElementById('circulo');

const paso = 10;        // Píxeles que se mueve en cada pulsación
const diametro = 50;    // Debe coincidir con el tamaño del círculo en el CSS
let x = 0;              // Posición actual del círculo
let y = 0;

window.addEventListener('keydown', (evento) => {
  if (evento.key === 'ArrowUp' || evento.code === 'KeyW') {
    y = y - paso;
  } else if (evento.key === 'ArrowDown' || evento.code === 'KeyS') {
    y = y + paso;
  } else if (evento.key === 'ArrowLeft' || evento.code === 'KeyA') {
    x = x - paso;
  } else if (evento.key === 'ArrowRight' || evento.code === 'KeyD') {
    x = x + paso;
  } else {
    return;               // Otra tecla: no hacemos nada
  }

  evento.preventDefault();   // Solo cancelamos las teclas que usamos

  // El círculo no puede salirse de la ventana
  if (x < 0) { x = 0; }
  if (y < 0) { y = 0; }
  if (x > window.innerWidth - diametro) { x = window.innerWidth - diametro; }
  if (y > window.innerHeight - diametro) { y = window.innerHeight - diametro; }

  circulo.style.transform = `translate(${x}px, ${y}px)`;
});
