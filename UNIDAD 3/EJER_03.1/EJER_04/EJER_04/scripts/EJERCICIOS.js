//Verificación de script
//EJERCICIO 1
(function(){
    const titulo = document.getElementById('titulo-principal')
    if(titulo){
        console.log('Ejercicio 1:', titulo.textContent )
    }
})()

//EJERCICIO 2
(function() {
    const enlaces = document.querySelectorAll('.navegacion a')
    console.log(`Ejercicio2: Hay ${enlaces.length} enlaces.`)
})()

//EJERCICIO 3
(function() {
    const premium = document.querySelector('.premium')
    if(premium){
        console.log('Ejercicio 3:', premium.outerHTML)
    } 
})()

//EJERCICIO 4
(function() {
    const tarjetas = document.querySelectorAll('.card')
    console.log('Ejercicio 4: ', tarjetas)
})()

//EJERCICIO 5
(function(){
const formularioContacto = document.getElementById('formulario-contacto')
console.log('Ejercicio 5: ', formularioContacto)
})()

//EJERCICIO 6
(function(){
    const parrafo = document.querySelector('[data-precio]')
    console.log('Ejercicio 6: ', parrafo)
})()

//EJERCICIO 7
(function(){
    const contacto = document.querySelector('#formulario-contacto input[type="email"]')
    console.log('Ejercicio 7:', contacto)
})()

//EJERCICIO 8
(function(){
    const segundoEnlace = document.querySelector('.navegacion a:nth-child(2)');
  if (segundoEnlace) {
    console.log('Ejercicio 8:', segundoEnlace.textContent);
  }
})()

//EJERCICIO 9
(function(){
    const nuevoTitulo = document.getElementById('titulo-principal')
    if(nuevoTitulo){
        nuevoTitulo.textContent = 'Nueva Guía Interactiva del DOM'
    }
})()

//EJERCICIO 10
(function(){
    const primerEnlace = document.querySelector('.navegacion a')
    if(primerEnlace){
        primerEnlace.href = 'https://www.google.com'
    }
})()

// EJERCICIO 11
(function() {
    const tituloP = document.getElementById('titulo-principal')
    if(tituloP){
        tituloP.classList.add('titulo-grande')
    }
})()

// EJERCICIO 12
(function(){
    const numCursos = document.querySelectorAll('.card').length;
  const enlaceContacto = document.querySelector('.navegacion a:last-child');
  if (enlaceContacto) {
    enlaceContacto.textContent = `Contacto (${numCursos} Cursos)`;
  }
})()

//EJERCICIO 13
(function() {
    const imagen = document.querySelector('.card img')
    if(imagen){
        imagen.src = 'img/hacer4.jpg'
    }
})()

// EJERCICIO 14
(function(){
    const boton = document.getElementById('btn-info-premium')
    if (boton) {
    boton.textContent = 'Ver Más'
  }
})()

// EJERCICIO 15
(function(){
const primeraTarjeta = document.querySelector('.card')
    if(primeraTarjeta){
        console.log('Ejercicio 14:', primeraTarjeta.nextElementSibling)
    }
})()

// EJERCICIO 16
(function(){
    const botonPro= document.getElementById('btn-info-premium')
  if (botonPro) {
    console.log('Ejercicio 16:', botonPro.parentElement)
  }
})()

// EJERCICIO 17
(function(){
    const encontrarH2 = document.querySelector('.premium')
    if(encontrarH2){
        const h2 = encontrarH2.querySelector('h2')
        console.log('Ejercicio 17:', h2)
    }
})()

// EJERCICIO 18
(function(){
    const footer = document.getElementById('footer-principal')
  if (footer && footer.previousElementSibling) {
    footer.previousElementSibling.style.border = '2px solid red'
  }
})()

// EJERCICIO 19
(function(){
    const primerEnlace = document.querySelector('.info')
  if (primerEnlace && primerEnlace.parentElement) {
    const imagen = primerEnlace.parentElement.firstElementChild
    console.log('Ejercicio 19:', imagen)
  }
})()

// EJERCICIO 20
(function(){
     const segundoEnlace = document.querySelector('.navegacion a:nth-child(2)')
  if (segundoEnlace && segundoEnlace.parentElement && segundoEnlace.parentElement.previousElementSibling) {
    segundoEnlace.parentElement.previousElementSibling.style.color = 'orange'
  }
})()

// EJERCICIO 21
(function() {
  const botonPremium = document.getElementById('btn-info-premium')
  if (botonPremium) {
    botonPremium.addEventListener('click', function() {
      alert('Información exclusiva para miembros premium')
    })
  }
})()

// EJERCICIO 22
(function() {
  const formulario = document.getElementById('formulario-contacto')
  if (formulario) {
    formulario.addEventListener('submit', function(event) {
      event.preventDefault()
      const nombre = document.getElementById('nombre').value
      const mensaje = document.getElementById('mensaje').value
      console.log('Ejercicio 22: Nombre:', nombre, 'Mensaje:', mensaje)
    })
  }
})()

// EJERCICIO 23
(function() {
  const cards = document.querySelectorAll('.card')
  const tercerCard = cards[2]
  if(tercerCard){
    const h2React = tercerCard.querySelector('h2')
    const parrafoOculto = tercerCard.querySelector('.oculto')
    if (h2React && parrafoOculto) {
      h2React.addEventListener('click', function() {
        parrafoOculto.classList.remove('oculto')
      })
    }
  }
})()

// EJERCICIO 24
(function() {
  const titulosCursos = document.querySelectorAll('.card h2')
  titulosCursos.forEach(function(titulo) {
    titulo.textContent = `[CURSO] ${titulo.textContent}`
  })
})()

// EJERCICIO 25
(function() {
  const tarjetas = document.querySelectorAll('.card')
  tarjetas.forEach(function(tarjeta) {
    const categoria = tarjeta.querySelector('.categoria')
    if (categoria && categoria.textContent === 'Desarrollo Web') {
      tarjeta.style.backgroundColor = '#f0f0f0'
    }
  })
})()

// EJERCICIO 26
(function() {
  const infos = document.querySelectorAll('.card .info')
  infos.forEach(function(info) {
    const pDuracion = document.createElement('p')
    pDuracion.textContent = 'Duración: 20 horas'
    pDuracion.classList.add('duracion')
    info.appendChild(pDuracion)
  })
})()

// EJERCICIO 27
(function() {
  const todasLasTarjetas = document.querySelectorAll('.card')
  const tarjetasNoPremium = Array.prototype.filter.call(todasLasTarjetas, function(tarjeta) {
    return !tarjeta.classList.contains('premium')
  })
  tarjetasNoPremium.forEach(function(tarjeta) {
    tarjeta.style.border = '2px dotted black'
  })
})()

// EJERCICIO 28
(function() {
  const categorias = document.querySelectorAll('.categoria')
  const nombresCategorias = Array.prototype.map.call(categorias, function(categoria) {
    return categoria.textContent
  })
  console.log('Ejercicio 28:', nombresCategorias)
})()

// EJERCICIO 29
(function() {
  const enlacesNav = document.querySelectorAll('.navegacion a')
  Array.prototype.forEach.call(enlacesNav, function(enlace) {
    enlace.setAttribute('data-tipo', 'enlace-nav')
  })
})()

// EJERCICIO 30
(function() {
  const seccionFormulario = document.getElementById('formulario-seccion')
  if (seccionFormulario) {
    const textarea = seccionFormulario.querySelector('textarea')
    if (textarea) {
      textarea.placeholder = 'Escribe aquí tu consulta'
    }
  }
})()

// EJERCICIO 31
(function() {
  const tarjetas = document.querySelectorAll('.card')
  tarjetas.forEach(function(tarjeta){
      const h2 = tarjeta.querySelector('h2')
      if(h2 && h2.textContent.includes('React')){
          const parrafoOculto = tarjeta.querySelector('.oculto')
          if(parrafoOculto){
              parrafoOculto.textContent += ' (¡Oferta especial!)'
          }
      }
  })
})()

// EJERCICIO 32
(function() {
  const tarjetas = document.querySelectorAll('.card')
  tarjetas.forEach(function(tarjeta) {
    const img = tarjeta.querySelector('img')
    if (img) {
      img.classList.add('imagen-curso')
    }
  })
})()