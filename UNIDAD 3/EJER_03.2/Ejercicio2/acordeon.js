function ocultarTodasLasRespuestas() {
    const respuestas = document.querySelectorAll("#listaFAQ p");

    respuestas.forEach(function (respuesta) {
        respuesta.classList.add("oculto");
    });
}

function revelarRespuesta(pregunta) {
    ocultarTodasLasRespuestas();

    const respuesta = pregunta.nextElementSibling;

    respuesta.classList.remove("oculto");
}