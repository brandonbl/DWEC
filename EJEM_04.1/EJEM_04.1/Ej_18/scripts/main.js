// Ej_17 · preventDefault() y stopPropagation() JUNTOS
//
// Son dos cosas distintas que se confunden con facilidad:
//
//   preventDefault()   → cancela la ACCIÓN POR DEFECTO del navegador (p. ej., abrir un enlace).
//                        El evento SIGUE subiendo por el DOM.
//   stopPropagation()  → detiene el VIAJE del evento (no llega a los ancestros).
//                        La acción por defecto SE EJECUTA igualmente.
//
// Marca las casillas, haz clic en el botón y en el enlace, y observa el registro.

const tarjeta = document.getElementById('tarjeta');
const botonComprar = document.getElementById('boton-comprar');
const enlace = document.getElementById('enlace');
const casillaCancelar = document.getElementById('cancelar');
const casillaDetener = document.getElementById('detener');
const registro = document.getElementById('registro');
const botonLimpiar = document.getElementById('boton-limpiar');

// Añade una línea al registro de la página
function anotar(texto) {
  const linea = document.createElement('li');
  linea.textContent = texto;
  registro.append(linea);
}

// Función común para el botón y el enlace: aplica lo que indiquen las casillas
function manejarClic(evento, nombre) {
  anotar(`Clic en ${nombre}`);

  if (casillaCancelar.checked) {
    evento.preventDefault();      // Cancela la acción por defecto
    anotar('   → preventDefault(): se cancela la acción del navegador');
  }

  if (casillaDetener.checked) {
    evento.stopPropagation();     // El clic no sube a la tarjeta
    anotar('   → stopPropagation(): el clic no llega a la tarjeta');
  }
}

botonComprar.addEventListener('click', (evento) => manejarClic(evento, 'el botón'));
enlace.addEventListener('click', (evento) => manejarClic(evento, 'el enlace'));

// La tarjeta es el ANCESTRO: recibe los clics que suben (fase de burbuja)
tarjeta.addEventListener('click', () => {
  anotar('Clic recibido en la tarjeta (ha subido por burbujeo)');
});

botonLimpiar.addEventListener('click', () => {
  registro.replaceChildren();
});

// Qué debes observar:
//  1. Sin casillas marcadas: el botón y el enlace "suben" hasta la tarjeta y el enlace se abre.
//  2. Solo "preventDefault": el enlace NO se abre, pero la tarjeta SÍ recibe el clic.
//  3. Solo "stopPropagation": la tarjeta NO recibe el clic, pero el enlace SÍ se abre.
//  4. Las dos casillas: ni se abre el enlace ni llega el clic a la tarjeta.
//  Nota: un botón type="button" no tiene acción por defecto, así que en él
//  preventDefault() no cambia nada visible.
