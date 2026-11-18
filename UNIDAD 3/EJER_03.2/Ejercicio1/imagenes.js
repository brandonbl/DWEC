function cambiarImagenPrincipal(indice) {
    const miniaturas = document.querySelectorAll(".miniatura");
    const miniaturaSeleccionada = miniaturas[indice];
    if (!miniaturaSeleccionada) {
        return;
    }
    const nuevaRuta = miniaturaSeleccionada.getAttribute("src");
    const imagenPrincipal = document.getElementById("imagen-principal");
    imagenPrincipal.setAttribute("src", nuevaRuta);
    resaltarMiniatura(indice);
}

function resaltarMiniatura(indice) {
    const miniaturas = document.querySelectorAll(".miniatura");

    miniaturas.forEach(function (miniatura, i) {
        if (i === indice) {
            miniatura.classList.add("activa");
        } else {
            miniatura.classList.remove("activa");
        }
    });
}
resaltarMiniatura(0);