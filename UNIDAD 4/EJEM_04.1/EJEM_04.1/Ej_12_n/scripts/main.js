// Ej_12 · Eventos de ratón
//  Parte 1: mousedown, mouseup, click, dblclick, contextmenu y wheel
//  Parte 2: mouseenter/mouseleave (NO burbujean) frente a mouseover/mouseout (SÍ burbujean)

// ---------- Parte 1 ----------
const zona = document.getElementById('zona');
const registro = document.getElementById('registro');

// Añade una línea al principio de la lista (máximo 8 líneas)
function anotar(texto) {
  const linea = document.createElement('li');
  linea.textContent = texto;
  registro.prepend(linea);
  if (registro.children.length > 8) {
    registro.lastElementChild.remove();
  }
}

// evento.button indica qué botón se pulsó: 0 izquierdo, 1 central, 2 derecho
zona.addEventListener('mousedown', (evento) => anotar('mousedown · botón ' + evento.button));
zona.addEventListener('mouseup', (evento) => anotar('mouseup · botón ' + evento.button));
zona.addEventListener('click', () => anotar('click'));
zona.addEventListener('dblclick', () => anotar('dblclick'));
zona.addEventListener('wheel', (evento) => anotar('wheel · deltaY = ' + evento.deltaY));

zona.addEventListener('contextmenu', (evento) => {
  evento.preventDefault();          // Anula el menú del botón derecho
  anotar('contextmenu (clic derecho)');
});

// ---------- Parte 2 ----------
// Cada caja contiene un elemento hijo. Mueve el ratón dentro de la caja y compara los contadores.
const cajaEnter = document.getElementById('caja-enter');
const cuentaEnter = document.getElementById('cuenta-enter');
const cajaOver = document.getElementById('caja-over');
const cuentaOver = document.getElementById('cuenta-over');

let entradasEnter = 0;
let salidasEnter = 0;
let entradasOver = 0;
let salidasOver = 0;

function pintarEnter() {
  cuentaEnter.textContent = `mouseenter: ${entradasEnter} · mouseleave: ${salidasEnter}`;
}

function pintarOver() {
  cuentaOver.textContent = `mouseover: ${entradasOver} · mouseout: ${salidasOver}`;
}

cajaEnter.addEventListener('mouseenter', () => { entradasEnter++; pintarEnter(); });
cajaEnter.addEventListener('mouseleave', () => { salidasEnter++; pintarEnter(); });
cajaOver.addEventListener('mouseover', () => { entradasOver++; pintarOver(); });
cajaOver.addEventListener('mouseout', () => { salidasOver++; pintarOver(); });

pintarEnter();
pintarOver();
