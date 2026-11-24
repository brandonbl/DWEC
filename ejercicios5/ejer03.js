const corregidos = [
    '{"nombre":"Luis"}',
    '{"activo":true}',
    '{"nombre":"Marta"}',
    '{"curso":"2DAW"}'
];

for (const texto of corregidos) {
    try {
        JSON.parse(texto);
        console.log("JSON correcto");
    } catch (error) {
        console.log("JSON incorrecto");
    }
}