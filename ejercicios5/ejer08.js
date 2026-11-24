function comprobarStock(unidades) {
    return new Promise((resolver, rechazar) => {
        setTimeout(() => {
            if (unidades > 0) {
                resolver("Quedan " + unidades + " unidades");
            } else {
                rechazar(new Error("Producto agotado"));
            }
        }, 1000);
    });
}

console.log("Consulta enviada: 5 unidades");

comprobarStock(5)
    .then(resultado => console.log("✔", resultado))
    .catch(error => console.log("✘", error.message))
    .finally(() => console.log("Consulta terminada"));


console.log("Consulta enviada: 0 unidades");

comprobarStock(0)
    .then(resultado => console.log("✔", resultado))
    .catch(error => console.log("✘", error.message))
    .finally(() => console.log("Consulta terminada"));

// Pregunta: las consultas aparecen antes porque setTimeout espera un segundo y el resto del código continúa ejecutándose mientras tanto.