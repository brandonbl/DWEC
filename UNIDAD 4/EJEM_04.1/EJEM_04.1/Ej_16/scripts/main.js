// Ej_16 · Eventos de teclado: keydown y keyup, key frente a code
//
//  - key  → el CARÁCTER que produce la tecla ('a', 'A', 'Enter'). Cambia con las mayúsculas.
//  - code → la TECLA FÍSICA ('KeyA', 'Enter'). No cambia con las mayúsculas.
//
// También existen evento.shiftKey, evento.ctrlKey y evento.altKey (true si esa tecla está pulsada).

const registro = document.getElementById('registro');

function anotar(evento) {
  const linea = document.createElement('li');
  linea.textContent = `${evento.type} · key = ${evento.key} · code = ${evento.code} · repeat = ${evento.repeat}`;
  registro.prepend(linea);
  if (registro.children.length > 10) {
    registro.lastElementChild.remove();
  }
}

// Escuchamos en document para recibir las teclas pulsadas en cualquier parte
document.addEventListener('keydown', anotar);   // Se repite si mantienes la tecla (repeat = true)
document.addEventListener('keyup', anotar);     // Una sola vez, al soltar
