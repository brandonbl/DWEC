export function crearProducto(nombre, categoria, precio, stock){
    return{
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        stock: stock
    }
}

export function filtrarPorCategoria(inventario, categoria){
    return inventario.filter(producto => producto.categoria === categoria)
}

export function listarProductosAgotados(inventario){
    return inventario.filter(producto => producto.stock ===0)
}
export function calcularValorTotalInventario(inventario){
    return inventario.reduce((total, producto) => total + (producto.precio * producto.stock), 0)
}

export default function resumenInventario(inventario){
    const numeroProductos = inventario.length;

    const categorias = new Set(
        inventario.map(producto => producto.categoria)
    )
}