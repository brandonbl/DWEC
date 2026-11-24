const titulos = {
    1: 'El nombre de la rosa',
    2: 'Cien años de soledad',
    3: 'Fahrenheit 451'
};

const buscarLibro = (id) =>
    new Promise((resolver, rechazar) => {
        setTimeout(() => {
            if (titulos[id]) {
                resolver({ id, titulo: titulos[id] });
            } else {
                rechazar(new Error("Libro no encontrado"));
            }
        }, 500);
    });

const segundosDesde = (inicio) =>
    ((Date.now() - inicio) / 1000).toFixed(1);


// 1. Una detrás de otra
let inicio = Date.now();

await buscarLibro(1);
await buscarLibro(2);
await buscarLibro(3);

console.log("Una detrás de otra:", segundosDesde(inicio), "s");


// 2. Todas a la vez
inicio = Date.now();

await Promise.all([
    buscarLibro(1),
    buscarLibro(2),
    buscarLibro(3)
]);

console.log("Con Promise.all:", segundosDesde(inicio), "s");


// 3. Promise.allSettled
const resultados = await Promise.allSettled([
    buscarLibro(1),
    buscarLibro(99),
    buscarLibro(3)
]);

let cumplidas = 0;
let rechazadas = 0;

for (const resultado of resultados) {
    if (resultado.status === "fulfilled") {
        cumplidas++;
    } else {
        rechazadas++;
    }
}

console.log("allSettled:", cumplidas, "cumplidas y", rechazadas, "rechazada");