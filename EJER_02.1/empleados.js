const listaEmpleados = []

function agregarEmpleado(nuevoEmpleado){
    listaEmpleados.push(nuevoEmpleado)
}
function eliminarEmpleado(id){
    listaEmpleados = listaEmpleados.filter((empleado) => empleado.id !== id)
}
function buscarPorDepartamento(departamento){
    return listaEmpleados.filter((empleado) => empleado.departamento === departamento)
}
function calcularSalarioPromedio(){
    return listaEmpleados.reduce((total, empleado) => total + empleado.salario, 0) /listaEmpleados.length
}
function obtenerEmpleadosOrdenadosPorSalario(){
    return listaEmpleados.sort((a, b) => a.salario - b.salario) 
}

export {agregarEmpleado, eliminarEmpleado, buscarPorDepartamento, calcularSalarioPromedio, obtenerEmpleadosOrdenadosPorSalario}