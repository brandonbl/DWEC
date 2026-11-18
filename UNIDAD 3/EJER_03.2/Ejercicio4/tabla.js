const usuarios = [
    { nombre: "Pablo", edad: 25 },
    { nombre: "Sergio", edad: 19 },
    { nombre: "Silvia", edad: 18 }
];

function crearTabla(array) {

    const contenedor = document.querySelector("#contenedor-tabla");
    const tabla = document.createElement("table");
    const fragmento = document.createDocumentFragment();

    array.forEach(function (usuario) {
        const fila = document.createElement("tr");
        const celdaNombre = document.createElement("td");

        celdaNombre.textContent = usuario.nombre;

        const celdaEdad = document.createElement("td");

        celdaEdad.textContent = usuario.edad;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaEdad);
        fragmento.appendChild(fila);
    });

    tabla.appendChild(fragmento);

    contenedor.appendChild(tabla);
}

// Ejecutar la función
crearTabla(usuarios);