const nuevaLista = () => ({
    propietario: 'Ana',
    productos: ['pan', 'leche']
});

// A) Igualar
const lista1 = nuevaLista();
const igual = lista1;

igual.productos.push('huevos');

console.log(lista1.productos);
console.log(lista1 === igual);


// B) Copia superficial
const lista2 = nuevaLista();
const superficial = { ...lista2 };

superficial.propietario = 'Luis';
superficial.productos.push('queso');

console.log(lista2.propietario);
console.log(lista2.productos);


// C) Copia profunda
const lista3 = nuevaLista();
const profunda = structuredClone(lista3);

profunda.propietario = 'Marta';
profunda.productos.push('fruta');

console.log(lista3);
console.log(profunda);

// Respuestas:
// 1. En la copia superficial, el propietario no cambia porque es un dato independiente, pero los productos sí porque el array sigue siendo compartido.
// 2. Si solo hay textos y números, usaría la copia superficial (...).