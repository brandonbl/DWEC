const dividir = (a, b) => {
  if (b === 0){
    throw new("No se puede dividir entre 0")
  }
  
    //TODO: lanza un error si b === 0
  return a / b
}

try {
  console.log(dividir(10, 0))
} catch (e) {
  console.log('Error:', e.message /* ... */)
} finally {
  console.log('Operación finalizada')
}