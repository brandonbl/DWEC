function generarInformeDeValidacion(event) {

    event.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const informe = document.querySelector("#informe-errores");

    informe.innerHTML = "";

    let nombreCorrecto = nombre.length > 3;
    let emailCorrecto = email.includes("@");

    if (!nombreCorrecto) {
        const errorNombre = document.createElement("p");
        errorNombre.textContent = "El nombre es incorrecto";
        informe.appendChild(errorNombre);
    }

    if (!emailCorrecto) {
        const errorEmail = document.createElement("p");
        errorEmail.textContent = "El email es incorrecto";
        informe.appendChild(errorEmail);
    }

    if (nombreCorrecto && emailCorrecto) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Formulario válido";
        informe.appendChild(mensaje);
    }
}