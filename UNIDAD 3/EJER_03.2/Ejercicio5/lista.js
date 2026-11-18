const input = document.querySelector("#tarea");
const botonAnadir = document.querySelector("#anadir");
const lista = document.querySelector("#lista-tareas");

botonAnadir.addEventListener("click", function () {
    const texto = input.value.trim();

    if (texto !== "") {
        const li = document.createElement("li");

        li.textContent = texto + " ";

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        li.appendChild(botonEliminar);

        lista.appendChild(li);

        input.value = "";
    }
});

lista.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        const tarea = event.target.parentNode;
        tarea.remove();
    }
});