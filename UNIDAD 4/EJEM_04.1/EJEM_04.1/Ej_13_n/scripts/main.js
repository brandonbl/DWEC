// Ej_13 · Coordenadas del puntero
//  - clientX / clientY → respecto a la VENTANA visible
//  - pageX / pageY     → respecto a la PÁGINA completa (cuenta el desplazamiento)
//  - offsetX / offsetY → respecto al ELEMENTO sobre el que está el puntero
//  - screenX / screenY → respecto a la PANTALLA
//
// Truco: la página es muy alta. Desplázala y comprueba que pageY cambia, pero clientY no.

const caja = document.getElementById('caja');
const panel = document.getElementById('panel');

caja.addEventListener('mousemove', (evento) => {
  panel.textContent =
    'clientX / clientY : ' + evento.clientX + ' / ' + evento.clientY + '\n' +
    'pageX   / pageY   : ' + evento.pageX + ' / ' + evento.pageY + '\n' +
    'offsetX / offsetY : ' + evento.offsetX + ' / ' + evento.offsetY + '\n' +
    'screenX / screenY : ' + evento.screenX + ' / ' + evento.screenY;
});

caja.addEventListener('mouseleave', () => {
  panel.textContent = 'Mueve el ratón sobre la caja…';
});
