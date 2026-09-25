'use strict'

const sumaFlexible = (x, y) => {
  const valorDe = (v) => Array.isArray (v)? v.reduce((a, b) => a + b, 0): v/* si v es un array, súmalo; si no, devuélvelo tal cual */

  return valorDe(x) + valorDe(y)
}

console.log(sumaFlexible(3, 4))      // 7
console.log(sumaFlexible([1, 2], 4)) // 7