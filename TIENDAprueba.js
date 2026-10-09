// tienda.js
// Ejercicio integrador UT 2.1 + UT 2.2: Tienda de música
//
// Completa cada función. No cambies su nombre ni sus parámetros.
// Comprueba tu trabajo con:  node pruebas.js
// Cuando todo esté en verde:  node main.js
//
// Recuerda: salvo en la PARTE 5, las funciones NO deben modificar
// los arrays que reciben. Si necesitas ordenar, copia primero.

// ================================================================
// PARTE 1 · EL CATÁLOGO
// ================================================================

// 1.1 Convierte la matriz [[nombre, categoria, precio, stock], ...]
//     en un array de objetos { nombre, categoria, precio, stock }.
//     Si lo que recibe no es un array, devuelve [].
export const crearCatalogo = (matriz) => {
  // Verificamos que el parámetro recibido sea estrictamente un array
  if (!Array.isArray(matriz)) return [];
  
  // Transformamos cada fila de la matriz en un objeto estructurado usando desestructuración
  return matriz.map(([nombre, categoria, precio, stock]) => ({
    nombre, 
    categoria, 
    precio, 
    stock
  }));
};

// 1.2 Devuelve un catálogo NUEVO con las novedades (que llegan en
//     formato matriz) añadidas al final.
export const ampliarCatalogo = (catalogo, matrizNovedades) => {
  // Primero convertimos la matriz de novedades a formato de objetos
  const novedades = crearCatalogo(matrizNovedades);
  
  // Retornamos un nuevo array combinando el catálogo actual y las novedades con el operador spread (...)
  return [...catalogo, ...novedades];
};

// 1.3 Devuelve los nombres de todos los productos en orden
//     alfabético, respetando las tildes ('Vinilo Ópera' va tras 'Vinilo Jazz').
export const nombresOrdenados = (catalogo) => {
  // Extraemos solo los nombres, los ordenamos usando localeCompare para soporte de tildes en español
  return catalogo
    .map((producto) => producto.nombre)
    .sort((a, b) => a.localeCompare(b, 'es'));
};

// 1.4 Devuelve una COPIA del catálogo ordenada por precio,
//     de menor a mayor o, si descendente es true, de mayor a menor.
export const ordenarPorPrecio = (catalogo, descendente = false) => {
  // Creamos una copia superficial para no mutar el array original
  const copia = [...catalogo];
  
  // Ordenamos según el indicador booleano 'descendente'
  return copia.sort((a, b) => 
    descendente ? b.precio - a.precio : a.precio - b.precio
  );
};

// 1.5 Devuelve los nombres de los tres productos más baratos.
export const tresMasBaratos = (catalogo) => {
  // Ordenamos por precio ascendente, tomamos los primeros 3 elementos y extraemos sus nombres
  return ordenarPorPrecio(catalogo)
    .slice(0, 3)
    .map((producto) => producto.nombre);
};

// ================================================================
// PARTE 2 · BÚSQUEDAS
// ================================================================

// 2.1 Devuelve el producto con ese nombre, sin distinguir mayúsculas
//     y minúsculas, o undefined si no existe.
export const buscarProducto = (catalogo, nombre) => {
  // Buscamos el primer elemento que coincida convirtiendo ambos nombres a minúsculas
  return catalogo.find(
    (producto) => producto.nombre.toLowerCase() === nombre.toLowerCase()
  );
};

// 2.2 Devuelve true si existe un producto con ese nombre.
//     Obligatorio: usa includes.
export const existeProducto = (catalogo, nombre) => {
  // Mapeamos los nombres a minúsculas y comprobamos si incluye el nombre buscado
  return catalogo
    .map((producto) => producto.nombre.toLowerCase())
    .includes(nombre.toLowerCase());
};

// 2.3 Devuelve la posición del producto en el catálogo, o -1.
export const posicionProducto = (catalogo, nombre) => {
  // Mapeamos los nombres y buscamos el índice de la coincidencia exacta
  return catalogo.map((producto) => producto.nombre).indexOf(nombre);
};

// 2.4 Devuelve un array con los NOMBRES de los productos sin stock.
export const agotados = (catalogo) => {
  // Filtramos los que tienen stock 0 y mapeamos para quedarnos solo con el nombre
  return catalogo
    .filter((producto) => producto.stock === 0)
    .map((producto) => producto.nombre);
};

// 2.5 Devuelve los productos con precio entre minimo y maximo
//     (ambos incluidos).
export const productosEntre = (catalogo, minimo, maximo) => {
  // Filtramos por rango de precios inclusivos y extraemos sus nombres
  return catalogo
    .filter((producto) => producto.precio >= minimo && producto.precio <= maximo)
    .map((producto) => producto.nombre);
};

// ================================================================
// PARTE 3 · CÁLCULOS
// ================================================================

// 3.1 Valor total del almacén: suma de precio × stock.
export const valorAlmacen = (catalogo) => {
  // Usamos reduce para acumular el valor total multiplicando precio por stock de cada producto
  return catalogo.reduce(
    (total, producto) => total + producto.precio * producto.stock, 
    0
  );
};

// 3.2 Devuelve el producto (el objeto completo) más caro.
export const productoMasCaro = (catalogo) => {
  // Comparamos los precios acumulativamente para conservar el objeto de mayor valor
  return catalogo.reduce((masCaro, producto) => 
    producto.precio > masCaro.precio ? producto : masCaro
  );
};

// 3.3 Devuelve un objeto con las unidades en stock de cada categoría:
//     { equipos: 7, accesorios: 29, discos: 14 }
export const unidadesPorCategoria = (catalogo) => {
  // Acumulamos sumando el stock en un objeto agrupado por categoría
  return catalogo.reduce((acumulador, producto) => {
    acumulador[producto.categoria] = (acumulador[producto.categoria] || 0) + producto.stock;
    return acumulador;
  }, {});
};

// 3.4 Devuelve true si hay AL MENOS un producto agotado.
export const hayAgotados = (catalogo) => {
  // some() retorna true si al menos un elemento cumple la condición
  return catalogo.some((producto) => producto.stock === 0);
};

// 3.5 Devuelve true si TODOS los precios son números mayores que 0.
export const preciosValidos = (catalogo) => {
  // every() retorna true si la condición se cumple para todos los elementos
  return catalogo.every((producto) => producto.precio > 0);
};

// ================================================================
// PARTE 4 · PEDIDOS
// ================================================================

// 4.1 Convierte el texto 'Lucía|Tocadiscos:1;Vinilo Jazz:2' en un objeto estructurado.
export const parsearPedido = (texto) => {
  // Separamos el cliente de las líneas de productos usando el pipe '|'
  const [cliente, textoLineas] = texto.split('|');
  
  // Separamos cada línea por ';' y mapeamos cada una a un objeto con nombre y cantidad numérica
  const lineas = textoLineas.split(';').map((lineaTexto) => {
    const [nombre, cantidad] = lineaTexto.split(':');
    return {
      nombre,
      cantidad: Number(cantidad)
    };
  });
  
  return { cliente, lineas };
};

// 4.2 Devuelve true si TODOS los productos del pedido existen y tienen stock suficiente.
export const puedeServirse = (catalogo, pedido) => {
  return pedido.lineas.every((linea) => {
    const producto = catalogo.find((p) => p.nombre === linea.nombre);
    // Comprobamos que el producto exista en el catálogo y su stock cubra la cantidad requerida
    return producto !== undefined && producto.stock >= linea.cantidad;
  });
};

// 4.3 Devuelve el importe total del pedido.
export const totalPedido = (catalogo, pedido) => {
  return pedido.lineas.reduce((total, linea) => {
    const producto = catalogo.find((p) => p.nombre === linea.nombre);
    return total + (producto ? producto.precio * linea.cantidad : 0);
  }, 0);
};

// 4.4 Devuelve un catálogo NUEVO restando el stock de los productos pedidos.
export const servirPedido = (catalogo, pedido) => {
  return catalogo.map((producto) => {
    const linea = pedido.lineas.find((l) => l.nombre === producto.nombre);
    
    // Si el producto está en el pedido, creamos una copia reduciendo su stock
    if (linea) {
      return {
        ...producto, 
        stock: producto.stock - linea.cantidad
      };
    }
    // Si no está en el pedido, devolvemos una copia idéntica del producto original
    return { ...producto };
  });
};

// 4.5 Devuelve el ticket del pedido formateado como texto multilínea.
export const generarTicket = (catalogo, pedido) => {
  const lineas = [`Cliente: ${pedido.cliente}`];
  
  pedido.lineas.forEach((linea) => {
    const producto = catalogo.find((p) => p.nombre === linea.nombre);
    const subtotal = producto ? producto.precio * linea.cantidad : 0;
    lineas.push(`${linea.cantidad} x ${linea.nombre} = ${subtotal} €`);
  });
  
  const total = totalPedido(catalogo, pedido);
  lineas.push(`TOTAL: ${total} €`);

  return lineas.join('\n');
};

// ================================================================
// PARTE 5 · COLA DE PEDIDOS Y CARRITO CON "DESHACER"
// En esta parte SÍ se modifican los arrays recibidos (mutabilidad).
// ================================================================

// 5.1 Saca y devuelve el primer pedido de la cola (FIFO).
export const atenderSiguiente = (cola) => {
  return cola.shift();
};

// 5.2 Coloca un pedido urgente al PRINCIPIO de la cola.
export const agregarUrgente = (cola, pedido) => {
  return cola.unshift(pedido);
};

// 5.3 Añade el nombre al carrito y registra la acción en el historial.
export const agregarAlCarrito = (carrito, historial, nombre) => {
  carrito.push(nombre);
  historial.push({
    accion: 'agregar',
    nombre
  });
  return carrito.length;
};

// 5.4 Quita la primera aparición del nombre en el carrito y registra en el historial.
export const quitarDelCarrito = (carrito, historial, nombre) => {
  const posicion = carrito.indexOf(nombre);

  if (posicion === -1) {
    return false; // Si no está, no hace nada y devuelve false
  }

  carrito.splice(posicion, 1);

  historial.push({
    accion: 'quitar',
    nombre, 
    posicion, // Guardamos la posición original para poder revertirlo luego
  });
  
  return true;
};

// 5.5 Revierte la última acción del historial (Estructura tipo PILA / LIFO).
export const deshacer = (carrito, historial) => {
  if (historial.length === 0) {
    return false;
  }
  
  const accion = historial.pop();
  
  // Si fue agregar, eliminamos la última aparición de ese elemento en el carrito
  if (accion.accion === 'agregar') {
    const posicion = carrito.lastIndexOf(accion.nombre);
    if (posicion !== -1) carrito.splice(posicion, 1);
  }
  
  // Si fue quitar, reinsertamos el elemento en su posición original exacta
  if (accion.accion === 'quitar') {
    carrito.splice(accion.posicion, 0, accion.nombre);
  }
  
  return true;
};

// ================================================================
// PARTE 6 · INFORME FINAL
// ================================================================

// 6.1 Procesa toda la cola de pedidos de forma iterativa actualizando el catálogo.
export const procesarCola = (catalogo, cola) => {
  const servidos = [];
  const rechazados = [];
  
  while (cola.length > 0) {
    const pedido = atenderSiguiente(cola);

    // Si se puede servir, actualizamos el catálogo y guardamos en servidos; si no, en rechazados
    if (puedeServirse(catalogo, pedido)) {
      catalogo = servirPedido(catalogo, pedido);
      servidos.push(pedido);
    } else {
      rechazados.push(pedido);
    }
  }
  
  return { catalogo, servidos, rechazados };
};

// 6.2 Devuelve los nombres de los productos vendidos sin duplicados y ordenados alfabéticamente.
export const productosVendidos = (pedidos) => {
  // Aplanamos todas las líneas de todos los pedidos usando flatMap
  const nombres = pedidos.flatMap((pedido) => 
    pedido.lineas.map((linea) => linea.nombre)
  );
  
  // Usamos Set para eliminar duplicados, convertimos de nuevo a array y ordenamos alfabéticamente
  return [...new Set(nombres)].sort((a, b) => a.localeCompare(b, 'es'));
};

// 6.3 Genera un gráfico visual del stock usando barras de caracteres ('■').
export const graficoStock = (catalogo) => {
  return catalogo.map((producto) => {
    // Creamos un array de la longitud del stock y lo rellenamos con '■'
    const barra = new Array(producto.stock).fill('■');
    return `${producto.nombre}: ${barra.join('')} (${producto.stock})`;
  });
};