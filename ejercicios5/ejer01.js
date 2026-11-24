console.log('Inicio');

try {
    console.log('Dentro del try 1');
    console.log(total);
    console.log('Dentro del try 2');
} catch (error) {
    console.log('Capturado:', error.name);
} finally {
    console.log('Limpieza');
}

console.log('Fin');


// No se ejecuta Dentro del try 2 porque total no está definida.
// Fin aparece porque el error se captura y el programa continúa.
// finally siempre se ejecuta.