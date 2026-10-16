// Ej_06 · Opciones de addEventListener(): "once" y "signal"
// Se pasan en un objeto como tercer parámetro: { once: true }

const botonUnaVez = document.getElementById('boton-una-vez');
const botonContar = document.getElementById('boton-contar');
const botonDetener = document.getElementById('boton-detener');
const salida = document.getElementById('salida');

// --- once: true → el escuchador se ejecuta UNA sola vez y se elimina solo ---
botonUnaVez.addEventListener('click', () => {
  salida.textContent = 'Este mensaje solo aparece la primera vez.';
}, { once: true });

// --- signal → permite eliminar un escuchador cuando queramos ---
let contador = 0;
const controlador = new AbortController();   // Es como un "interruptor" para cancelar escuchadores

botonContar.addEventListener('click', () => {
  contador++;
  salida.textContent = `Clics contados: ${contador}`;
}, { signal: controlador.signal });          // Unimos el escuchador al interruptor

botonDetener.addEventListener('click', () => {
  controlador.abort();                       // Apagamos el interruptor: el contador deja de funcionar
  salida.textContent = `Contador detenido en ${contador}.`;
});
