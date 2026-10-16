// ================================================================
// RETO 2 · switch Y BUCLES                          (escribir funciones)
// ================================================================


// 2.1 descuentoPorCategoria
export const descuentoPorCategoria = (categoria) => {
  switch (categoria) {
    case 'Estudiante':
    case 'jubilado':
      return 0.2;;
      break
    case 'familiaNumerosa':
      return 0.3;
      break
    case 'socio':
      return 0.1;
      break
    default:
      return 0;
  }
};

// 2.2 sumarHastaLimite
export const sumarHastaLimite = (numeros, limite) => {
  let suma = 0;
  for(let i = 0; i < numeros.length; i++) {
    if(numeros[i] > limite || numeros[i] <limite) {
      continue
    }

    if(suma + numeros[i] > limite) {
      break
    }
    suma += numeros[i]
  }
  return suma
};

// 2.3 contarVocales
export const contarVocales = (texto) => {
  const vocales = 'aeiouAEIOU'
  let contador = 0
  for (let caracter of texto) {
    if (vocales.includes(caracter)) {
      contador++
    }
  }
  return contador
};
