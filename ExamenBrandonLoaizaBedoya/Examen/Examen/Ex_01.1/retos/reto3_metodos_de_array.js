// ================================================================
// RETO 3 · MÉTODOS DE ARRAY                         (escribir funciones)
// ================================================================

// 3.1 nombresCaros
export const nombresCaros = (productos, minimo) => {
  return [...productos].filter((producto) => producto.precio >= minimo)
  .sort((a, b) => a.nombresCaros.localeCompare(b.nombresCaros, 'es'))
  .map((producto) => producto.nombresCaros)
};

// 3.2 totalInventario
export const totalInventario = (productos) => {
  return productos.reduce((acumulado, producto) => acumulado + (producto.precio * producto.unidades), 0)
};

// 3.3 agruparPorCategoria
export const agruparPorCategoria = (productos) => {
return productos.reduce((acumulador, producto) => {
    acumulador[producto.categoria] = (acumulador[producto.categoria] || 0) + producto.nombre
    return acumulador
  }, {})
}

// 3.4 productoMasBarato
export const productoMasBarato = (productos) => {
  return productos.reduce((masBarato, producto) => {
    if (!masBarato || producto.precio < masBarato.precio) {
      return producto
    }
    return masBarato
  }, null)
};

// 3.5 hayAgotados
export const hayAgotados = (productos) => {
  return productos.some((producto) => producto.unidades === 0)
};
