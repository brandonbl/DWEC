function dividir(a, b) {
    if (b === 0) {
        throw new RangeError("No se puede dividir entre cero");
    }

    return a / b;
}

const operaciones = [[10, 2], [5, 0], [7, 4]];

for (const [a, b] of operaciones) {
    try {
        console.log(a + " / " + b + " = " + dividir(a, b));
    } catch (error) {
        console.log(error.name + ": " + error.message);
    } finally {
        console.log("Operación terminada");
    }
}