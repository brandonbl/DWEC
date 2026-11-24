// Nombre y apellidos: ______________________________

import { peliculas } from './datos.js';

// ============================================================
// Elementos de la página (ya seleccionados: no los cambies)
// ============================================================
const formularioFiltros = document.querySelector('#formulario-filtros');
const cartelera = document.querySelector('#cartelera');
const contador = document.querySelector('#contador');
const listaReservas = document.querySelector('#lista-reservas');
const totalReservas = document.querySelector('#total-reservas');
const mensajeReservas = document.querySelector('#mensaje-reservas');
const formularioReserva = document.querySelector('#formulario-reserva');
const resultado = document.querySelector('#resultado');

// Se desactiva la validación del navegador: los mensajes los muestras tú (apartado 4)
formularioReserva.noValidate = true;

// Entradas reservadas (apartado 3)
let reservas = [];


// ============================================================
// APARTADO 1 · La cartelera
// ============================================================

// 1.1
const crearTarjeta = (pelicula) => {
  const tarjeta = document.createElement('article')

tarjeta.className = 'tarjeta'
tarjeta.dataset.id = pelicula.id

  const titulo = document.createElement('h3')
  titulo.textContent = pelicula.titulo

  const contenido = document.createElement('p')
  contenido.textContent = pelicula.contenido

  const contenido2 = document.createElement('p')
  contenido2.textContent = pelicula.contenido2

  const botonReservar = document.createElement('button')
  botonReservar.type='button'
  botonReservar.className = 'reservar' 
  botonReservar.textContent = 'Reservar'

  if(pelicula ===''){
    tarjeta.addClastList('agotado')
    botonReservar.disabled.textContent = 'Agotada'
  } 

  tarjeta.append(titulo, contenido, contenido2, botonReservar)

  return tarjeta
};

// 1.2
function pintarCartelera(lista) {
  const cartelera = document.querySelector('#cartelera');
  cartelera.replaceChildren();

  for (const pelicula of lista) {
    const tarjeta = crearTarjeta(pelicula);
    cartelera.appendChild(tarjeta);
  }
}


// ============================================================
// APARTADO 2 · Filtros y orden
// ============================================================

// 2.1
const filtrarPeliculas = (lista, genero, soloDisponibles) => {
  return lista.filer((pelicula) => {
    const cumpleGenero = genero === '' || pelicula.genero === genero
    const cumpleDisponible = !soloDisponibles || pelicula.disponible
    return cumpleGenero && cumpleDisponible
  })
};

// 2.2
const ordenarPeliculas = (lista, criterio) => {
  return lista.sort((a, b) => {
    if(criterio !== 'titulo'){
      return a.titulo.localeCompare(b.titulo)
    }

    return a[criterio] - b[criterio]
  })

  
};

// 2.3
const actualizarCartelera = () => {
 const genero = formularioFiltros.elements.genero.value
 const soloDisponibles = formularioFiltros.elements.disponible.value
 const criterios = formularioFiltros.elements.orden.value

 const filtradas = filtrarPeliculas(peliculas, genero, soloDisponibles)
 const ordenadas = ordenarPeliculas(filtradas, criterio)

 pintarCartelera(ordenadas)
 
 const contador = document.querySelector('#contador')
 contador.textContent = `Mostrando ${ordenadas.lenght} de ${peliculas.length} peliculas`
};

// 2.4 · Eventos de los filtros
formularioFiltros.addEventListener('input', actualizarCartelera)


// ============================================================
// APARTADO 3 · Entradas reservadas
// ============================================================

// 3.1
const anadirReserva = (pelicula) => {
  const existe = reservas.find((pelicula) => pelicula.id === pelicula)
   if(existe){
    existe.cantidad += 1
   }else {
    reservas.push({
      id: pelicula.id,
      titulo: pelicula.titulo,
      precio: pelicula.precio,
      cantidad: 1

    })
   }
};

// 3.2
const eliminarReserva = (id) => {
  const reservas = reservas.filter((reserva) => reserva.id !== reserva)
};

// 3.3
const calcularTotal = (lista) => {
  return lista.reduce((total, reserva) => total + reserva.precio * reserva.cantidad, 0) 
};

// 3.4
const pintarReservas = () => {
  const listaReservas = document.querySelector('#lista-reservas')
  const totalReservas = document.querySelector('#total-reservas')

  listaReservas.replaceChild()

  for ( const reserva of reserva){
    const li = document.createElement('li')
    const importeLinea = reserva.precio * reserva.cantidad
  }

  li.textContent = `${reserva.titulo} x ${reserva.cantidad} - ${importeLinea} euros`

  const botorQuitar = document.querySelector('button')
  bottonQuitar.addClastList('Quitar')

  botonQuitar.dataset.id = reserva.id
  bottonQuitar.type = 'button'
  bottonQuitar.textContent = 'X'

  li.appendChild(botorQuitar)
  listaReservas.appendChild(li)

  totalReservas.textContent = `TOTAL: ${calcularTotal.reservas}`
};

// 3.5 · Eventos de la cartelera y de la lista de entradas



// ============================================================
// APARTADO 4 · Formulario de reserva y validación
// ============================================================

// 4.1
const mostrarError = (campo) => {

  const parrafoError = document.querySelector(`#error-${campo.name}`)
const validez = campo.validity

if (validez.valueMissing) {
    return 'Este campo es obligatorio';
  }

  
  if (validez.tooShort) {
    return `Escribe al menos ${campo.minLength} caracteres`;
  }


  if (validez.rangeUnderflow || validez.rangeOverflow) {
    return `Debe estar entre ${campo.min} y ${campo.max}`;
  }



  return '';
};

// 4.2
const comprobarReglas = () => {
  
};

// 4.3 · Eventos focusout e input del formulario


// 4.4 · Evento submit del formulario
// TU CÓDIGO AQUÍ
formularioFiltros.addEventListener('submit' , (evento) => {
  evento.preventDefault()
  comprobarReglas()

  const campos = [...formularioFiltros.querySelectorAll('input, select')];
  let primerInvalido = null;

  campos.forEach((campo) => {
    const esValido = comprobarReglas(campo);
    if (!esValido && !primerInvalido) {
      primerInvalido = campo;
    }

    if (primerInvalido) {
    primerInvalido.focus();
    return;
  }

  const tituloLimpio = formularioFiltros.elements.titulo.value.trim();
  const datosNuevaTarea = {
    titulo: tituloLimpio,
    precio: Number(campoHoras.value),
    cantidad: 1
  };
    mensajeFormulario.textContent = `Tarea añadida: ${tituloLimpio}`;
  });
}

)

// ============================================================
// ARRANQUE · al cargar la página (apartados 2.4 y 3.5)
// ============================================================
// TU CÓDIGO AQUÍ 
