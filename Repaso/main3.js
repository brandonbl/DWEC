const temperaturas = [12, 5, 32, 100, 28, 0, -5];


const copiaOrdenada = [...array].sort(/* función de comparación */);
// En Node 20+ y navegadores actuales también puedes usar: array.toSorted(…)

// Ejercicio 1.1
const ordenar = temperaturas.sort((a, b) => a - b)


const jugadores = [
  { nombre: "Erik", puntos: 450 },
  { nombre: "Valeria", puntos: 980 },
  { nombre: "Matias", puntos: 120 },
  { nombre: "Sandra", puntos: 750 }
];

// Ejercicio 2.1
const ranking = [...jugadores].sort((a, b) => b.puntos - a.puntos) 

const alumnos = ["Íñigo", "Álvaro", "Berenice", "Ángela", "Niño", "Ñandú"];

// Ejecicio 3.1
const listadoOficial = [...alumnos].sort((a, b) => a.localeCompare(b, 'es'))