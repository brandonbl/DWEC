// Ej_07 · Cuándo está lista la página: DOMContentLoaded frente a load
//
//  - DOMContentLoaded (en document): el HTML ya está analizado y el DOM construido.
//    No espera a las imágenes.
//  - load (en window): TODO está cargado, también las imágenes.

const registro = document.getElementById('registro');

// Añade una línea con los milisegundos transcurridos desde que empezó la carga
function anotar(texto) {
  const linea = document.createElement('li');
  linea.textContent = `${Math.round(performance.now())} ms · ${texto}`;
  registro.append(linea);
}

anotar('se ejecuta el script (el DOM ya está construido)');

document.addEventListener('DOMContentLoaded', () => anotar('evento DOMContentLoaded'));

// ⚠️ "load" se escucha en window, no en document
window.addEventListener('load', () => anotar('evento load'));

// La imagen retrasa "load", pero no DOMContentLoaded
document.getElementById('imagen').addEventListener('load', () => anotar('la imagen termina de cargarse'));
