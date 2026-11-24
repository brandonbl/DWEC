console.log('1. Salgo de casa');

setTimeout(() => console.log('2. Llego al supermercado (500 ms)'), 500);

console.log('3. Cojo el carro');

setTimeout(() => console.log('4. Pago en caja (0 ms)'), 0);

setTimeout(() => console.log('5. Vuelvo a casa (1000 ms)'), 1000);

console.log('6. Hago la lista');

// Explicación: el número 6 aparece antes que el 4 porque JavaScript ejecuta primero el código normal. 
// Después ejecuta las funciones programadas con setTimeout.