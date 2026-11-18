// Nombre y apellidos: ______________________________

import { tareasIniciales } from './datos.js';

// ============================================================
// Constantes y elementos de la página (ya definidos: no los cambies)
// ============================================================
const ESTADOS = ['porhacer', 'encurso', 'hecha'];
const LIMITE_HORAS = 40;

const formularioTarea = document.querySelector('#formulario-tarea');
const campoHoras = formularioTarea.elements.horas;
const mensajeFormulario = document.querySelector('#mensaje-formulario');
const buscador = document.querySelector('#buscador');
const botonArchivar = document.querySelector('#boton-archivar');
const tablero = document.querySelector('#tablero');
const listaHoras = document.querySelector('#horas-asignatura');
const progreso = document.querySelector('#progreso');

const columnas = {
  porhacer: document.querySelector('#col-porhacer'),
  encurso: document.querySelector('#col-encurso'),
  hecha: document.querySelector('#col-hecha')
};
const contadores = {
  porhacer: document.querySelector('#num-porhacer'),
  encurso: document.querySelector('#num-encurso'),
  hecha: document.querySelector('#num-hecha')
};

// Se desactiva la validación del navegador: los mensajes los muestras tú (apartado 1)
formularioTarea.noValidate = true;

// Tareas del tablero. Es una copia: los datos originales no se tocan
let tareas = tareasIniciales.map((tarea) => ({ ...tarea }));

// Repinta todo a partir del array de tareas (ya hecha: la usarás en el apartado 4)
const repintar = () => {
  pintarTablero(buscarTareas(tareas, buscador.value));
  pintarResumen(tareas);
};


// ============================================================
// APARTADO 1 · Formulario y validación
// ============================================================

// 1.1 · Devuelve el texto del error de un campo según su `validity` ('' si es válido)
const mensajeDeError = (campo) => {
  const validez = campo.validity

  if(validez.valueMissing) {
    return 'Este campo es obligatorio'
  };

  if(validez.tooShort){
  return `Escribe al menos ${campo.minLength} caracteres`
  }

  if(validez.rangeUnderflow || validez.rangeOverflow){
  return`Debe estar entre ${campo.min} y ${campo.max}`
  }

if(validez.customError){
  return campo.validationMessage
}

  return ''
}
// 1.2 · Muestra u oculta el error de un campo y devuelve si es válido
const validarCampo = (campo) => {
  const mensaje = mensajeDeError(campo)
  
  campo.nextElementSibling.textContent = mensaje;

  if (mensaje !== ''){
    campo.classList.add('invalido')
    return false
  }else{
    campo.classList.remove('invalido')
    return true
  }

};

// 1.3 · Aplica (o quita) el error personalizado de #horas según el límite de horas pendientes
const comprobarHoras = () => {
   const pendientes = tareas.filter((tarea) => {
    return tarea.estado !== 'hecha';
  });

  const horasPendientes = pendientes.reduce((total, tarea) => {
    return total + tarea.horas;
  }, 0);

  const horasNuevas = Number(campoHoras.value) || 0;

  if (horasPendientes + horasNuevas > LIMITE_HORAS) {
    campoHoras.setCustomValidity(
      `Superas el límite de ${LIMITE_HORAS} h pendientes (ahora hay ${horasPendientes} h)`
    );
  } else {
    campoHoras.setCustomValidity('');
  }
};

// 1.4 · Deja el formulario como recién cargado
const limpiarFormulario = () => {
  formularioTarea.reset();
  const campos = formularioTarea.querySelectorAll('input, select');
  campos.forEach((campo)=>{
    campo.nextElementSibling.textContent = '';
    campo.classList.remove('invalido')
  })
  
   campoHoras.setCustomValidity('');
  mensajeFormulario.textContent = '';
};

// 1.5 · Eventos del formulario (change, input y keydown)
// TU CÓDIGO AQUÍ
// Evento change
formularioTarea.addEventListener('change', (evento) => {
  const campo = evento.target;

  if (campo.matches('input, select')) {
    comprobarHoras();
    validarCampo(campo);
  }
});

// Evento input
formularioTarea.addEventListener('input', (evento) => {
  const campo = evento.target;

  if (campo.matches('input, select') && campo.classList.contains('invalido')) {
    comprobarHoras();
    validarCampo(campo);
  }
});

// Evento keydown
formularioTarea.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    limpiarFormulario();
  }
});

// ============================================================
// APARTADO 2 · Cálculos con los datos (funciones puras)
// ============================================================

// 2.1 · Tareas cuyo título o asignatura contienen el texto buscado
const buscarTareas = (lista, texto) => {
  const busqueda = texto.trim().toLowerCase()
  return lista.filter((tarea) => {
    return tarea.titulo.toLowerCase().includes(busqueda) || tarea.asignatura.toLowerCase().includes(busqueda)
  })
};

// 2.2 · Reparte las tareas en un objeto con una lista por cada estado
const agruparPorEstado = (lista) => {
  return{
    porhacer: lista.filter((tarea) => tarea.estado === 'porhacer'),
    encurso: lista.filter((tarea) => tarea.estado === 'encurso'),
    hecha: lista.filter((tarea) => tarea.estado === 'hecha'),
  } 
};

// 2.3 · Suma las horas de cada asignatura, de más a menos horas
const horasPorAsignatura = (lista) => {
  const totales = {};

  lista.forEach((tarea) => {
    if (totales[tarea.asignatura] === undefined) {
      totales[tarea.asignatura] = 0;
    }

    totales[tarea.asignatura] += tarea.horas;
  });

  return Object.keys(totales)
    .map((asignatura) => {
      return {
        asignatura: asignatura,
        horas: totales[asignatura]
      };
    })
    .sort((a, b) => {
      if (b.horas !== a.horas) {
        return b.horas - a.horas;
      }

      return a.asignatura.localeCompare(b.asignatura);
    });
};


// ============================================================
// APARTADO 3 · Pintar la página
// ============================================================

// 3.1 · Devuelve (sin insertarla) la tarjeta <li> de una tarea
const crearTarjeta = (tarea) => {
  const tarjeta = document.createElement('li');

  tarjeta.className = `tarjeta prioridad-${tarea.prioridad}`;
  tarjeta.dataset.id = tarea.id;

  const titulo = document.createElement('strong');
  titulo.className = 'titulo';
  titulo.textContent = tarea.titulo;

  const meta = document.createElement('span');
  meta.className = 'meta';
  meta.textContent = `${tarea.asignatura} · ${tarea.horas} h`;

  const botonRetroceder = document.createElement('button');
  botonRetroceder.type = 'button';
  botonRetroceder.dataset.accion = 'retroceder';
  botonRetroceder.textContent = '←';

  const botonAvanzar = document.createElement('button');
  botonAvanzar.type = 'button';
  botonAvanzar.dataset.accion = 'avanzar';
  botonAvanzar.textContent = '→';

  const indiceEstado = ESTADOS.indexOf(tarea.estado);

  botonRetroceder.disabled = indiceEstado === 0;
  botonAvanzar.disabled = indiceEstado === ESTADOS.length - 1;

  tarjeta.append(
    titulo,
    meta,
    botonRetroceder,
    botonAvanzar
  );

  return tarjeta;
};

// 3.2 · Reparte las tarjetas de lista en las tres columnas y actualiza los contadores
const pintarTablero = (lista) => {
  const grupos = agruparPorEstado(lista);

  columnas.porhacer.textContent = '';
  columnas.encurso.textContent = '';
  columnas.hecha.textContent = '';

  Object.keys(grupos).forEach((estado) => {
    grupos[estado].forEach((tarea) => {
      const tarjeta = crearTarjeta(tarea);
      columnas[estado].append(tarjeta);
    });

    contadores[estado].textContent = grupos[estado].length;
  });
};

// 3.3 · Pinta el resumen: horas por asignatura y progreso
const pintarResumen = (lista) => {
  // 1. Pintar las horas por asignatura
  listaHoras.textContent = '';
  const resumenHoras = horasPorAsignatura(lista);

  resumenHoras.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.asignatura} — ${item.horas} h`;
    listaHoras.append(li);
  });

  // 2. Calcular y pintar el progreso
  const total = lista.length;
  const hechas = lista.filter((tarea) => tarea.estado === 'hecha').length;
  const porcentaje = total === 0 ? 0 : Math.round((hechas / total) * 100);

  progreso.textContent = `Hechas: ${hechas} de ${total} (${porcentaje}%)`;
};


// ============================================================
// APARTADO 4 · Interacción
// ============================================================

// 4.1 · Mueve una tarea `paso` columnas (+1 avanza, -1 retrocede)
const moverTarea = (id, paso) => {
  // Buscamos la tarea por su id
  const tarea = tareas.find((t) => t.id === id);
  // Si no existe, salimos sin hacer nada
  if (!tarea) return;

  // Miramos en qué índice de ESTADOS está ahora y calculamos el destino
  const indiceActual = ESTADOS.indexOf(tarea.estado);
  const nuevoIndice = indiceActual + paso;

  // Si el índice se sale por abajo (< 0) o por arriba (>= 3), no hacemos nada
  if (nuevoIndice < 0 || nuevoIndice >= ESTADOS.length) return;

  // Actualizamos el estado de la tarea
  tarea.estado = ESTADOS[nuevoIndice];
};

// 4.2 · Añade una tarea nueva al array y la devuelve
const anadirTarea = (datos) => {
  // Calculamos el mayor id actual + 1 (o 1 si el array estuviera vacío)
  const nuevoId = tareas.length > 0
    ? Math.max(...tareas.map((t) => t.id)) + 1
    : 1;

  // Creamos el objeto con el estado inicial 'porhacer'
  const nuevaTarea = {
    id: nuevoId,
    titulo: datos.titulo,
    asignatura: datos.asignatura,
    horas: datos.horas,
    estado: 'porhacer',
    prioridad: datos.prioridad
  };

  // Lo guardamos en el array y lo devolvemos
  tareas.push(nuevaTarea);
  return nuevaTarea;
};

// 4.3 · Elimina del array las tareas hechas y devuelve cuántas eran
const archivarHechas = () => {
  const cantidad = tareas.filter((tarea) => {
    return tarea.estado === 'hecha';
  }).length;

  for (let i = tareas.length - 1; i >= 0; i--) {
    if (tareas[i].estado === 'hecha') {
      tareas.splice(i, 1);
    }
  }

  return cantidad;
};

// 4.4 · Eventos del tablero, del buscador y del botón «Archivar hechas», y primer pintado
tablero.addEventListener('click', (evento) => {
  // Comprobamos si el clic fue dentro de un botón con atributo data-accion
  const boton = evento.target.closest('button[data-accion]');
  if (!boton) return;

  // Subimos hasta la tarjeta <li> padre para leer su data-id y lo pasamos a número
  const tarjeta = boton.closest('.tarjeta');
  const id = Number(tarjeta.dataset.id);

  // Decidimos si sumar +1 o restar -1 según el data-accion del botón
  const paso = boton.dataset.accion === 'avanzar' ? 1 : -1;

  // Movemos la tarea en los datos y repintamos el tablero
  moverTarea(id, paso);
  repintar();
});

buscador.addEventListener('input', () => {
  // Cada vez que cambia el texto del buscador, repintamos (repintar ya lee buscador.value)
  repintar();
});

botonArchivar.addEventListener('click', () => {
  // Eliminamos las hechas y actualizamos la vista
  archivarHechas();
  repintar();
});

// Primer pintado inicial al cargar la página
repintar();

// 4.5 · Envío del formulario
formularioTarea.addEventListener('submit', (evento) => {
  // 1. Evitamos que el formulario recargue la página
  evento.preventDefault();

  // 2. Actualizamos la validación personalizada del límite de horas
  comprobarHoras();

  // 3. Validamos todos los campos del formulario a la vez y guardamos cuál es el primer inválido
  const campos = [...formularioTarea.querySelectorAll('input, select')];
  let primerInvalido = null;

  campos.forEach((campo) => {
    const esValido = validarCampo(campo);
    if (!esValido && !primerInvalido) {
      primerInvalido = campo;
    }
  });

  // 4. Si hubo algún error, llevamos el foco al primer campo inválido y cortamos la ejecución
  if (primerInvalido) {
    primerInvalido.focus();
    return;
  }

  // 5. Si todo es válido, preparamos los datos limpios y añadimos la tarea
  const tituloLimpio = formularioTarea.elements.titulo.value.trim();
  const datosNuevaTarea = {
    titulo: tituloLimpio,
    asignatura: formularioTarea.elements.asignatura.value,
    horas: Number(campoHoras.value),
    prioridad: formularioTarea.elements.prioridad.value
  };

  anadirTarea(datosNuevaTarea);
  limpiarFormulario();
  repintar();

  // 6. Mostramos el mensaje de confirmación DESPUÉS de limpiarFormulario() para que no lo borre
  mensajeFormulario.textContent = `Tarea añadida: ${tituloLimpio}`;
});
