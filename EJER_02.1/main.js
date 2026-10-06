import {
  agregarEmpleado,
  eliminarEmpleado,
  buscarPorDepartamento,
  calcularSalarioPromedio,
  obtenerEmpleadosOrdenadosPorSalario,
} from "./empleados.js";

// 1. Contratar empleados
const nuevosEmpleados = [
  { id: 1, nombre: "Ana", departamento: "Desarrollo", salario: 2800 },
  { id: 2, nombre: "Luis", departamento: "Marketing", salario: 2200 },
  { id: 3, nombre: "Marta", departamento: "Desarrollo", salario: 3200 },
  { id: 4, nombre: "Carlos", departamento: "Soporte", salario: 1900 },
  { id: 5, nombre: "Elena", departamento: "Marketing", salario: 2500 },
  { id: 6, nombre: "Pablo", departamento: "Desarrollo", salario: 3000 },
  { id: 7, nombre: "Lucía", departamento: "Soporte", salario: 2100 },
  { id: 8, nombre: "Jorge", departamento: "RRHH", salario: 2400 },
];

nuevosEmpleados.forEach((emp) => agregarEmpleado(emp));
console.log(`Se han contratado ${nuevosEmpleados.length} empleados.`);

// 2. Buscar por departamento
mostrarLista("Departamento: Desarrollo", buscarPorDepartamento("Desarrollo"));
mostrarLista("Departamento: Marketing", buscarPorDepartamento("Marketing"));
mostrarLista("Departamento: Finanzas", buscarPorDepartamento("Finanzas"));

// 3. Salario promedio
console.log(
  `\nSalario promedio de la empresa: ${calcularSalarioPromedio().toFixed(2)} €`
);

// 4. Lista ordenada por salario (de mayor a menor)
mostrarLista("Empleados ordenados por salario", obtenerEmpleadosOrdenadosPorSalario());

// 5. Un empleado deja la empresa
console.log("\nCarlos (id 4) deja la empresa...");
eliminarEmpleado(4);

// 6. Volvemos a calcular para ver el efecto
console.log(
  `Nuevo salario promedio: ${calcularSalarioPromedio().toFixed(2)} €`
);
mostrarLista("Lista final ordenada por salario", obtenerEmpleadosOrdenadosPorSalario());