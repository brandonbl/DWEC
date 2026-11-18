function calcularAreaRectangulo(base, altura) {
    return base * altura 
}

const calcularAreaTriangulo = function(base,altura){
    return (base * altura) / 2
}

const calcularAreaTriangulo2 = (base, altura) => {return (base * altura / 2)}

function calcularAreaRectanguloDefecto(base = 10, altura = 5) { 
    return base * altura;
}

console.log("Área del rectángulo:", calcularAreaRectangulo(8, 4)); 
console.log("Área del triángulo (Function Expression):", calcularAreaTriangulo(8, 4)); 
console.log("Área del triángulo (Arrow Function):", calcularAreaTrianguloFlecha(8, 4)); 
console.log("Área del rectángulo con valores por defecto:", calcularAreaRectanguloDefecto());