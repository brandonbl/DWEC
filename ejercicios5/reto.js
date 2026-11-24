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

const textoIds = '[3, 1, 99, 2]';

async function informe() {

    let ids;

    // Convertir JSON
    try {
        ids = JSON.parse(textoIds);
    } catch (error) {
        console.log("Error al leer los IDs");
        return;
    }

    // Buscar todos los libros
    const resultados = await Promise.allSettled(
        ids.map(id => buscarLibro(id))
    );

    let encontrados = 0;
    let noExisten = 0;

    // Mostrar resultados
    for (let i = 0; i < resultados.length; i++) {

        const resultado = resultados[i];

        if (resultado.status === "fulfilled") {
            console.log("✔", ids[i], "·", resultado.value.titulo);
            encontrados++;
        } else {
            console.log("✘", ids[i], "·", resultado.reason.message);
            noExisten++;
        }
    }

    console.log(encontrados, "encontrados y", noExisten, "no existen");
}

await informe();