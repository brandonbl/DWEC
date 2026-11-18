const botones = document.getElementById("botonesPestanas");
const contenidos = document.querySelectorAll(".contenido");

botones.addEventListener("click", function (event) {

    if (event.target.tagName === "BUTTON") {

        contenidos.forEach(function (contenido) {
            contenido.classList.add("oculto");
        });

        const idContenido = event.target.dataset.id;

        const contenidoActivo = document.getElementById(idContenido);

        if (contenidoActivo) {
            contenidoActivo.classList.remove("oculto");
        }
    }
});