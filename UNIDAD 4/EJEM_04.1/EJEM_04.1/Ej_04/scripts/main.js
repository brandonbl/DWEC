// Ej_04 · LIMITACIÓN de las propiedades del DOM: solo cabe UN controlador por evento
// (con addEventListener caben varios)

const botonPropiedad = document.getElementById('boton-propiedad');
const botonEscuchador = document.getElementById('boton-escuchador');
const registro = document.getElementById('registro');

// Añade una línea a la lista de la página
function anotar(texto) {
  const linea = document.createElement('li');
  linea.textContent = texto;
  registro.append(linea);
}

// --- Con la propiedad onclick: la segunda asignación SOBRESCRIBE la primera ---
botonPropiedad.onclick = () => anotar('onclick · primer controlador');   // Se pierde
botonPropiedad.onclick = () => anotar('onclick · segundo controlador');  // Es el único que queda

// --- Con addEventListener: se ejecutan los dos, en orden ---
botonEscuchador.addEventListener('click', () => anotar('addEventListener · primer escuchador'));
botonEscuchador.addEventListener('click', () => anotar('addEventListener · segundo escuchador'));
