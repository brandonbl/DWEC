const mascota = {
    nombre: 'Luna',
    edad: 3,
    vacunada: true,
    vacunas: ['rabia', 'moquillo'],
    apodo: undefined,
    fechaAlta: new Date('2026-09-01T10:00:00Z')
};

// 1. Convertir a JSON
const texto = JSON.stringify(mascota);
console.log(texto);

// 2. Con sangría de 2 espacios
console.log(JSON.stringify(mascota, null, 2));

// 3. Mostrar solo nombre y edad
console.log(JSON.stringify(mascota, ['nombre', 'edad']));

// 4. Volver a convertir a objeto
const objeto = JSON.parse(texto);

console.log(objeto.vacunas[0]);
console.log(typeof objeto.fechaAlta);

// apodo no aparece porque su valor es undefined.
// fechaAlta deja de ser una fecha porque JSON la guarda como texto.