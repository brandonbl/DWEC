const input = document.getElementById("cantidad");
const boton = document.getElementById("generarBtn");
const resultado = document.getElementById("resultado");

const textoLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

boton.addEventListener("click", function () {

    const cantidad = Number(input.value);
    resultado.innerHTML = "";

    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 100) {
        resultado.textContent = "Introduce un número entre 1 y 100.";
        return;
    }

    const fragmento = document.createDocumentFragment();

    for (let i = 0; i < cantidad; i++) {
        const parrafo = document.createElement("p");

        parrafo.textContent = textoLorem;

        fragmento.appendChild(parrafo);
    }
    resultado.appendChild(fragmento);
});