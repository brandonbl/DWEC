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
                rechazar(new Error(`No existe ningún libro con id ${id}`));
            }
        }, 500);
    });

async function mostrarTitulos(ids) {

    for (const id of ids) {
        try {
            const libro = await buscarLibro(id);
            console.log(libro.id + ": " + libro.titulo);

        } catch (error) {
            console.log(id + ": ✘ " + error.message);
        }
    }

    console.log("Fin de la búsqueda");
}

await mostrarTitulos([1, 99, 2, 3]);