const ciudades = [
    { ciudad: "Madrid", pais: "España" },
    { ciudad: "París", pais: "Francia" },
    { ciudad: "Barcelona", pais: "España" },
    { ciudad: "Roma", pais: "Italia" },
    { ciudad: "Lyon", pais: "Francia" },
    { ciudad: "Sevilla", pais: "España" },
    { ciudad: "Milán", pais: "Italia" }
];

const lista = document.getElementById("listaCiudades");
const input = document.getElementById("busqueda");
const botonFiltrar = document.getElementById("filtrarBtn");
const botonMostrar = document.getElementById("mostrarTodasBtn");

function filtrarCiudades(pais) {
    const elementos = lista.querySelectorAll("li");

    elementos.forEach(function (elemento) {
        if (elemento.textContent.toLowerCase().includes(pais.toLowerCase())) {
            elemento.style.display = "";
        } else {
            elemento.style.display = "none";
        }
    });
}

botonFiltrar.addEventListener("click", function () {
    filtrarCiudades(input.value.trim());
});

botonMostrar.addEventListener("click", function () {
    const elementos = lista.querySelectorAll("li");

    elementos.forEach(function (elemento) {
        elemento.style.display = "";
    });

    input.value = "";
});