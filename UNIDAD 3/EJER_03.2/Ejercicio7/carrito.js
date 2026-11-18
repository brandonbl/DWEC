const productos = document.getElementById("productos");
const carrito = document.getElementById("carrito");
const total = document.getElementById("total");

function calcularTotal() {

    let suma = 0;
    const elementosCarrito = carrito.querySelectorAll("li");

    elementosCarrito.forEach(function (producto) {
        const precio = Number(producto.dataset.price);
        suma += precio;
    });

    total.textContent = suma.toFixed(2);
}

productos.addEventListener("click", function (event) {
    if (event.target.classList.contains("anadir")) {

        const producto = event.target.parentNode;
        const copia = producto.cloneNode(true);
        const botonAnadir = copia.querySelector(".anadir");
        botonAnadir.remove();
        const botonQuitar = document.createElement("button");
        botonQuitar.textContent = "Quitar";
        botonQuitar.classList.add("quitar");
        copia.appendChild(botonQuitar);
        carrito.appendChild(copia);
        calcularTotal();
    }
});

carrito.addEventListener("click", function (event) {
    if (event.target.classList.contains("quitar")) {

        const producto = event.target.parentNode;
        producto.remove();

        calcularTotal();
    }
});