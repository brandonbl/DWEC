// ============================================================================
// IMPORTACIÓN DE DATOS INICIALES
// ============================================================================
// Importa el array 'tareasIniciales' desde el módulo externo './datos.js'.
// Requiere que el script en el HTML esté cargado con type="module".
import { tareasIniciales } from './datos.js';


// ============================================================================
// CONSTANTES, REFERENCIAS AL DOM Y ESTADO DE LA APLICACIÓN
// ============================================================================

// Array constante que define el orden lógico de las columnas del tablero.
// Su índice (0, 1, 2) permite calcular fácilmente si una tarea puede avanzar (+1) o retroceder (-1).
const ESTADOS = ['porhacer', 'encurso', 'hecha'];

// Regla de negocio: máximo de horas permitidas entre todas las tareas que NO estén 'hecha'.
const LIMITE_HORAS = 40;

// --- Referencias a elementos estáticos del DOM ---
const formularioTarea = document.querySelector('#formulario-tarea'); // El elemento <form>
// Acceso directo mediante la colección '.elements' usando el atributo name="horas" del input
const campoHoras = formularioTarea.elements.horas;
const mensajeFormulario = document.querySelector('#mensaje-formulario'); // Párrafo/span para feedback al enviar
const buscador = document.querySelector('#buscador');                   // Input de texto para filtrar
const botonArchivar = document.querySelector('#boton-archivar');       // Botón para borrar tareas completadas
const tablero = document.querySelector('#tablero');                   // Contenedor padre de las 3 columnas (delegación de eventos)
const listaHoras = document.querySelector('#horas-asignatura');        // <ul> donde se listan horas por asignatura
const progreso = document.querySelector('#progreso');                   // Elemento de texto con el % completado

// --- Diccionarios (objetos mapa) para acceso dinámico mediante corchetes: columnas[estado] ---
// Evita tener que escribir condicionales if/else o switch para elegir en qué columna pintar.
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

// Desactiva los bocadillos de error nativos del navegador al hacer submit.
// De este modo, podemos gestionar y mostrar nuestros propios mensajes personalizados en el DOM.
formularioTarea.noValidate = true;

// --- Estado global de la aplicación ---
// Creamos una copia superficial (shallow copy) del array y de cada objeto tarea usando spread ({ ...tarea }).
// Así evitamos mutar los datos importados originales ('tareasIniciales').
let tareas = tareasIniciales.map((tarea) => ({ ...tarea }));

// --- Función orquestadora de renderizado ---
// Sincroniza toda la interfaz con el estado actual del array 'tareas':
// 1. Filtra las tareas según el texto del buscador y las pinta en el tablero.
// 2. Recalcula y pinta el resumen lateral (usando TODAS las tareas, sin filtrar por el buscador).
const repintar = () => {
  pintarTablero(buscarTareas(tareas, buscador.value));
  pintarResumen(tareas);
};


// ============================================================================
// APARTADO 1 · FORMULARIO Y VALIDACIÓN (Constraint Validation API)
// ============================================================================

// 1.1 · Inspecciona la propiedad nativa 'campo.validity' (objeto ValidityState)
// y devuelve el mensaje de error correspondiente, o cadena vacía ('') si es válido.
const mensajeDeError = (campo) => {
  const validez = campo.validity; // Objeto booleano con el estado de cada restricción HTML5

  // El campo tiene atributo 'required' y está vacío
  if (validez.valueMissing) {
    return 'Este campo es obligatorio';
  }

  // El texto tiene menos caracteres que el atributo HTML 'minlength'
  if (validez.tooShort) {
    return `Escribe al menos ${campo.minLength} caracteres`;
  }

  // El valor numérico es menor que 'min' o mayor que 'max'
  if (validez.rangeUnderflow || validez.rangeOverflow) {
    return `Debe estar entre ${campo.min} y ${campo.max}`;
  }

  // Se ha establecido un error manual mediante campo.setCustomValidity('texto')
  if (validez.customError) {
    return campo.validationMessage; // Devuelve exactamente el string pasado a setCustomValidity
  }

  // Si no entra en ningún caso anterior, el campo cumple todas las reglas
  return '';
};

// 1.2 · Actualiza visualmente el estado de error de un campo y devuelve boolean (true = válido).
const validarCampo = (campo) => {
  const mensaje = mensajeDeError(campo);

  // Escribe el mensaje en el elemento hermano inmediatamente posterior en el HTML (ej. <span class="error">)
  campo.nextElementSibling.textContent = mensaje;

  if (mensaje !== '') {
    campo.classList.add('invalido'); // Añade clase CSS para borde rojo, etc.
    return false;
  } else {
    campo.classList.remove('invalido');
    return true;
  }
};

// 1.3 · Validación de regla de negocio personalizada sobre el campo #horas.
// Comprueba que la suma de horas pendientes actuales + las horas de la nueva tarea no supere LIMITE_HORAS.
const comprobarHoras = () => {
  // 1. Filtramos solo las tareas que aún no están terminadas
  const pendientes = tareas.filter((tarea) => {
    return tarea.estado !== 'hecha';
  });

  // 2. Sumamos sus horas acumuladas con .reduce() partiendo de 0
  const horasPendientes = pendientes.reduce((total, tarea) => {
    return total + tarea.horas;
  }, 0);

  // 3. Convertimos el valor del input (siempre es string) a número. Si está vacío o es NaN, vale 0.
  const horasNuevas = Number(campoHoras.value) || 0;

  // 4. Aplicamos o limpiamos el error personalizado mediante setCustomValidity()
  if (horasPendientes + horasNuevas > LIMITE_HORAS) {
    // Al pasar una cadena no vacía, campoHoras.validity.customError pasa a ser true
    campoHoras.setCustomValidity(
      `Superas el límite de ${LIMITE_HORAS} h pendientes (ahora hay ${horasPendientes} h)`
    );
  } else {
    // Al pasar cadena vacía '', se elimina el error personalizado y el campo vuelve a ser válido
    campoHoras.setCustomValidity('');
  }
};

// 1.4 · Restaura el formulario a su estado inicial limpio.
const limpiarFormulario = () => {
  formularioTarea.reset(); // Resetea los valores de todos los inputs a su valor por defecto HTML

  // Selecciona todos los controles del formulario y limpia sus estilos y textos de error
  const campos = formularioTarea.querySelectorAll('input, select');
  campos.forEach((campo) => {
    campo.nextElementSibling.textContent = '';
    campo.classList.remove('invalido');
  });

  // Es fundamental limpiar también el estado interno de validación personalizada
  campoHoras.setCustomValidity('');
  mensajeFormulario.textContent = '';
};

// 1.5 · Eventos del formulario (Delegación de eventos sobre formularioTarea)

// Evento 'change': se dispara cuando el usuario modifica un campo y pierde el foco (blur),
// o al cambiar una opción en un <select>.
formularioTarea.addEventListener('change', (evento) => {
  const campo = evento.target; // Elemento exacto que disparó el evento

  // Comprobamos que el target sea un input o select (ignorando botones, fieldsets, etc.)
  if (campo.matches('input, select')) {
    comprobarHoras();    // Actualiza primero la validez personalizada de horas
    validarCampo(campo); // Evalúa y pinta el error si procede
  }
});

// Evento 'input': se dispara en tiempo real con cada pulsación de tecla.
// Solo revalidamos en vivo si el campo YA estaba marcado como 'invalido' (UX menos intrusiva:
// no regaña mientras escribes por primera vez, pero quita el error al instante en cuanto lo corriges).
formularioTarea.addEventListener('input', (evento) => {
  const campo = evento.target;

  if (campo.matches('input, select') && campo.classList.contains('invalido')) {
    comprobarHoras();
    validarCampo(campo);
  }
});

// Evento 'keydown': detecta pulsaciones de teclado dentro del formulario.
// Si el usuario pulsa la tecla Escape, limpia y resetea todo el formulario.
formularioTarea.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    limpiarFormulario();
  }
});


// ============================================================================
// APARTADO 2 · CÁLCULOS CON LOS DATOS (Funciones puras: no modifican argumentos ni DOM)
// ============================================================================

// 2.1 · Filtra una lista de tareas buscando coincidencias parciales sin distinguir mayúsculas/minúsculas.
const buscarTareas = (lista, texto) => {
  // Normalizamos el término de búsqueda quitando espacios extremos y pasando a minúsculas
  const busqueda = texto.trim().toLowerCase();

  return lista.filter((tarea) => {
    return (
      tarea.titulo.toLowerCase().includes(busqueda) ||
      tarea.asignatura.toLowerCase().includes(busqueda)
    );
  });
};

// 2.2 · Clasifica un array plano de tareas en un objeto agrupado por sus 3 estados posibles.
const agruparPorEstado = (lista) => {
  return {
    porhacer: lista.filter((tarea) => tarea.estado === 'porhacer'),
    encurso: lista.filter((tarea) => tarea.estado === 'encurso'),
    hecha: lista.filter((tarea) => tarea.estado === 'hecha')
  };
};

// 2.3 · Calcula el total de horas por cada asignatura y devuelve un array ordenado.
const horasPorAsignatura = (lista) => {
  // Paso 1: Diccionario acumulador { "Matemáticas": 12, "Física": 8 }
  const totales = {};

  lista.forEach((tarea) => {
    // Si la asignatura aún no existe como clave en el objeto, la inicializamos a 0
    if (totales[tarea.asignatura] === undefined) {
      totales[tarea.asignatura] = 0;
    }
    // Sumamos las horas de esta tarea al acumulador de su asignatura
    totales[tarea.asignatura] += tarea.horas;
  });

  // Paso 2: Convertimos las claves del objeto en un array de objetos { asignatura, horas }
  return Object.keys(totales)
    .map((asignatura) => {
      return {
        asignatura: asignatura,
        horas: totales[asignatura]
      };
    })
    // Paso 3: Ordenamos el array resultante
    .sort((a, b) => {
      // Criterio principal: de mayor a menor número de horas (orden descendente)
      if (b.horas !== a.horas) {
        return b.horas - a.horas;
      }
      // Criterio de desempate: orden alfabético respetando tildes y eñes (localeCompare)
      return a.asignatura.localeCompare(b.asignatura);
    });
};


// ============================================================================
// APARTADO 3 · PINTAR LA PÁGINA (Manipulación del DOM)
// ============================================================================

// 3.1 · Construye en memoria el nodo <li> de una tarjeta de tarea y lo devuelve listo para insertar.
// Nota de seguridad: usa .textContent en lugar de .innerHTML para evitar inyección de código (XSS).
const crearTarjeta = (tarea) => {
  const tarjeta = document.createElement('li');

  // Asigna clase base 'tarjeta' + clase dinámica según prioridad (ej. 'prioridad-alta')
  tarjeta.className = `tarjeta prioridad-${tarea.prioridad}`;
  // Guarda el ID en el atributo HTML 'data-id' para poder identificar la tarea al hacer clic
  tarjeta.dataset.id = tarea.id;

  // Título de la tarea
  const titulo = document.createElement('strong');
  titulo.className = 'titulo';
  titulo.textContent = tarea.titulo;

  // Metadatos (asignatura y horas)
  const meta = document.createElement('span');
  meta.className = 'meta';
  meta.textContent = `${tarea.asignatura} · ${tarea.horas} h`;

  // Botón para retroceder columna (←)
  const botonRetroceder = document.createElement('button');
  botonRetroceder.type = 'button'; // Evita comportamientos de submit si estuviera dentro de un form
  botonRetroceder.dataset.accion = 'retroceder'; // Atributo data-accion="retroceder"
  botonRetroceder.textContent = '←';

  // Botón para avanzar columna (→)
  const botonAvanzar = document.createElement('button');
  botonAvanzar.type = 'button';
  botonAvanzar.dataset.accion = 'avanzar'; // Atributo data-accion="avanzar"
  botonAvanzar.textContent = '→';

  // Lógica de límites para deshabilitar botones en los extremos del tablero
  const indiceEstado = ESTADOS.indexOf(tarea.estado); // 0 ('porhacer'), 1 ('encurso') o 2 ('hecha')

  botonRetroceder.disabled = indiceEstado === 0;                  // Deshabilitado en la primera columna
  botonAvanzar.disabled = indiceEstado === ESTADOS.length - 1;    // Deshabilitado en la última columna

  // Inserta todos los hijos de una sola vez dentro del <li>
  tarjeta.append(titulo, meta, botonRetroceder, botonAvanzar);

  return tarjeta;
};

// 3.2 · Renderiza las tres columnas del tablero y actualiza sus contadores numéricos.
const pintarTablero = (lista) => {
  // Agrupamos la lista recibida en { porhacer: [...], encurso: [...], hecha: [...] }
  const grupos = agruparPorEstado(lista);

  // Vaciamos el contenido HTML previo de las tres columnas antes de volver a pintar
  columnas.porhacer.textContent = '';
  columnas.encurso.textContent = '';
  columnas.hecha.textContent = '';

  // Recorremos las claves ('porhacer', 'encurso', 'hecha')
  Object.keys(grupos).forEach((estado) => {
    // Por cada tarea del grupo, creamos su tarjeta y la añadimos a su columna correspondiente
    grupos[estado].forEach((tarea) => {
      const tarjeta = crearTarjeta(tarea);
      columnas[estado].append(tarjeta);
    });

    // Actualizamos el badge/contador numérico de esa columna
    contadores[estado].textContent = grupos[estado].length;
  });
};

// 3.3 · Renderiza el panel de estadísticas: listado de horas por asignatura y porcentaje de progreso.
const pintarResumen = (lista) => {
  // 1. Pintar las horas por asignatura
  listaHoras.textContent = ''; // Limpiamos la lista anterior
  const resumenHoras = horasPorAsignatura(lista);

  resumenHoras.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.asignatura} — ${item.horas} h`;
    listaHoras.append(li);
  });

  // 2. Calcular y pintar el progreso
  const total = lista.length;
  const hechas = lista.filter((tarea) => tarea.estado === 'hecha').length;
  // Operador ternario para evitar división por cero (0 / 0 = NaN) cuando no hay tareas
  const porcentaje = total === 0 ? 0 : Math.round((hechas / total) * 100);

  progreso.textContent = `Hechas: ${hechas} de ${total} (${porcentaje}%)`;
};


// ============================================================================
// APARTADO 4 · INTERACCIÓN Y GESTIÓN DE EVENTOS
// ============================================================================

// 4.1 · Modifica el estado de una tarea en el array 'tareas' desplazándola 'paso' posiciones (+1 o -1).
const moverTarea = (id, paso) => {
  // Localizamos la referencia al objeto tarea dentro del array global
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) return; // Cláusula de guarda: si no existe el ID, salimos

  const indiceActual = ESTADOS.indexOf(tarea.estado);
  const nuevoIndice = indiceActual + paso;

  // Cláusula de guarda: evitamos salirnos de los límites del array ESTADOS (0 a 2)
  if (nuevoIndice < 0 || nuevoIndice >= ESTADOS.length) return;

  // Mutamos la propiedad 'estado' del objeto encontrado
  tarea.estado = ESTADOS[nuevoIndice];
};

// 4.2 · Crea un nuevo objeto tarea con un ID autoincremental único, lo inserta y lo devuelve.
const anadirTarea = (datos) => {
  // Calculamos el ID más alto existente y sumamos 1. Si el array está vacío, empezamos en 1.
  // Se usa el operador spread (...) porque Math.max espera argumentos sueltos, no un array.
  const nuevoId = tareas.length > 0
    ? Math.max(...tareas.map((t) => t.id)) + 1
    : 1;

  const nuevaTarea = {
    id: nuevoId,
    titulo: datos.titulo,
    asignatura: datos.asignatura,
    horas: datos.horas,
    estado: 'porhacer', // Toda tarea nueva entra siempre en la primera columna
    prioridad: datos.prioridad
  };

  tareas.push(nuevaTarea); // Añade al final del array de estado
  return nuevaTarea;
};

// 4.3 · Elimina del array 'tareas' todas las que tengan estado 'hecha' y devuelve cuántas borró.
const archivarHechas = () => {
  // Contamos previamente cuántas tareas están hechas para poder devolver el dato
  const cantidad = tareas.filter((tarea) => {
    return tarea.estado === 'hecha';
  }).length;

  // IMPORTANTE: Recorremos el array de ATRÁS HACIA DELANTE (i--) al usar .splice().
  // Si recorriéramos hacia delante (i++), al borrar un elemento los siguientes se desplazarían
  // una posición a la izquierda y nos saltaríamos elementos sin revisar.
  for (let i = tareas.length - 1; i >= 0; i--) {
    if (tareas[i].estado === 'hecha') {
      tareas.splice(i, 1); // Elimina 1 elemento en la posición 'i' mutando el array original
    }
  }

  return cantidad;
};

// 4.4 · Listeners del tablero (Delegación), buscador, botón archivar y arranque inicial

// Delegación de eventos en '#tablero': un único listener gestiona los clics de todos los botones
// de todas las tarjetas (incluso las que se creen dinámicamente en el futuro).
tablero.addEventListener('click', (evento) => {
  // .closest() busca hacia arriba desde el elemento clicado hasta encontrar un <button data-accion="...">
  const boton = evento.target.closest('button[data-accion]');
  if (!boton) return; // Si se hizo clic en el texto de la tarjeta o en el fondo, ignoramos

  // Subimos hasta el contenedor <li class="tarjeta"> para leer su atributo data-id
  const tarjeta = boton.closest('.tarjeta');
  // dataset.id siempre devuelve un string; lo convertimos a Number para que coincida con tarea.id
  const id = Number(tarjeta.dataset.id);

  // Traducimos el string 'avanzar'/'retroceder' a desplazamiento numérico +1 / -1
  const paso = boton.dataset.accion === 'avanzar' ? 1 : -1;

  moverTarea(id, paso); // 1. Actualiza el estado
  repintar();           // 2. Actualiza la vista
});

// Filtra el tablero en tiempo real cada vez que el usuario escribe o borra en el buscador
buscador.addEventListener('input', () => {
  repintar();
});

// Elimina las tareas completadas y refresca tablero y estadísticas
botonArchivar.addEventListener('click', () => {
  archivarHechas();
  repintar();
});

// Renderizado inicial al cargar el script para mostrar las tareas iniciales en pantalla
repintar();

// 4.5 · Gestión del envío (submit) del formulario de nueva tarea
formularioTarea.addEventListener('submit', (evento) => {
  // 1. Detiene el envío HTTP tradicional que recargaría la página y perdería el estado en memoria
  evento.preventDefault();

  // 2. Recalcula la validación cruzada del límite de 40 horas pendientes
  comprobarHoras();

  // 3. Validamos TODOS los campos del formulario (no nos detenemos en el primero para mostrar
  // todos los errores a la vez) y guardamos referencia al primer campo que falle.
  const campos = [...formularioTarea.querySelectorAll('input, select')];
  let primerInvalido = null;

  campos.forEach((campo) => {
    const esValido = validarCampo(campo);
    if (!esValido && !primerInvalido) {
      primerInvalido = campo;
    }
  });

  // 4. Si existe al menos un campo inválido, ponemos el cursor (foco) en el primero y abortamos
  if (primerInvalido) {
    primerInvalido.focus();
    return;
  }

  // 5. Extraemos y saneamos los valores del formulario
  const tituloLimpio = formularioTarea.elements.titulo.value.trim();
  const datosNuevaTarea = {
    titulo: tituloLimpio,
    asignatura: formularioTarea.elements.asignatura.value,
    horas: Number(campoHoras.value), // Conversión explícita de string a número
    prioridad: formularioTarea.elements.prioridad.value
  };

  // 6. Actualizamos estado, reseteamos formulario y repintamos toda la interfaz
  anadirTarea(datosNuevaTarea);
  limpiarFormulario();
  repintar();

  // 7. Mostramos el aviso de éxito DESPUÉS de limpiarFormulario(), ya que limpiarFormulario()
  // vacía 'mensajeFormulario.textContent'.
  mensajeFormulario.textContent = `Tarea añadida: ${tituloLimpio}`;
});