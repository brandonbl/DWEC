// ================================================================
// RETO 1 · CORREGIR MÉTODOS DE ARRAY                (corregir código)
// ================================================================

export const ordenarNumeros = (numeros) => {
  return [...numeros].sort((a, b) => a - b);
};

export const duplicarPrecios = (precios) => {
  return precios.map((precio) => {
    return precio * 2;
  });
};

export const ultimos = (lista, cantidad) => {
  return lista.slice(-cantidad);
};

export const primerPar = (numeros) => {
  const par = numeros.find((numero) => numero % 2 === 0);
  return par ? par : 'ninguno';
};

export const sumaTotal = (numeros) => {
  return numeros.reduce((acumulado, numero) =>  acumulado + numero, 0);
};
