// ==========================================================
// EJER_04.1 · Eventos en JavaScript
// Escribe aquí tus soluciones (módulo ES6).
// - Nombres de variables y funciones en español.
// - Usa addEventListener (no onclick en el HTML).
// ==========================================================

// ---------- Ejercicio 1 · Contador de clics ----------

let contador = 0;
const valor = document.getElementById("valor-contador");
const botonrestar = document.getElementById("boton-restar");
const botonsumar = document.getElementById("boton-sumar");
const botonreiniciar = document.getElementById("boton-reiniciar");

function actualizarcontador() {
    valor.textContent = contador;

    if (contador < 0) {
        valor.style.color = "red";
    } else {
        valor.style.color = "";
    }

}

botonrestar.addEventListener("click", function () {
    contador--;
    actualizarcontador();
})

botonsumar.addEventListener("click", function () {
    contador++;
    actualizarcontador();
})

botonreiniciar.addEventListener("click", function () {
    contador = 0;
    actualizarcontador();
})

// ---------- Ejercicio 2 · Tarjeta sensible al ratón ----------

const tarjeta = document.getElementById("tarjeta-raton")
const mensaje = document.getElementById("mensaje-raton")

tarjeta.addEventListener("mouseenter", function () {
    tarjeta.classList.add("activa")
    mensaje.textContent = "¡Estás dentro!";
})

tarjeta.addEventListener("mouseleave", function () {
    tarjeta.classList.remove("activa")
    mensaje.textContent = "Pasa el ratón por la tarjeta";
})

tarjeta.addEventListener("dblclick", function () {
    tarjeta.textContent = "¡Doble clic!";
})

// ---------- Ejercicio 3 · Espejo de texto ----------

const campo = document.getElementById("campo-texto");
const ecoTexto = document.getElementById("eco-texto");
const caracteresRestantes = document.getElementById("caracteres-restantes");

campo.addEventListener("input", function () {
    
    ecoTexto.textContent=campo.value;

    const restantes=30 - campo.value.length;
    caracteresRestantes.textContent=restantes

    if (caracteresRestantes.textContent<6) {
        caracteresRestantes.classList.add("poco")
    }else{
        
        caracteresRestantes.classList.remove("poco")
    }

})

// ---------- Ejercicio 4 · Mover con el teclado ----------


// ---------- Ejercicio 5 · Paleta de colores ----------

const paleta=document.getElementById("paleta")
const lienzo=document.getElementById("lienzo")
const nombrecolor=document.getElementById("nombre-color")

paleta.addEventListener("click",function (evento) {
    const muestra=evento.target.closest(".muestra");

    if (!muestra || !paleta.contains(muestra)) {
        return;
    }

    const color=muestra.getAttribute("data-color");
    const nombre=muestra.getAttribute("data-nombre");

    lienzo.style.backgroundColor=color;
    nombrecolor.textContent=nombre;

});

// ---------- Ejercicio 6 · Grupo con foco ----------

const grupo = document.getElementById("grupo-contacto");
const mensajefoco = document.getElementById("mensaje-foco");

grupo.addEventListener("focusin", function(evento) {
    grupo.classList.add("activo");

    mensajefoco.textContent = "Editando: " + evento.target.placeholder;
});

grupo.addEventListener("focusout", function(evento) {
    if (!grupo.contains(evento.relatedTarget)) {
        grupo.classList.remove("activo");
        mensajefoco.textContent = "Ningún campo activo";
    }
});


// ---------- Ejercicio 7 · Burbuja y captura ----------

const externa=document.getElementById("caja-externa");
const media=document.getElementById("caja-media");
const interna=document.getElementById("caja-interna");
const registro=document.getElementById("registro-flujo");
const botonlimpiar=document.getElementById("boton-limpiar-flujo");

function anotar(texto) {
    const elemento=document.createElement("li")
    elemento.textContent=texto;
    registro.appendChild(elemento);
}

externa.addEventListener("click",function () {
    anotar("Externa");
});

media.addEventListener("click",function () {
    anotar("Media");
});

interna.addEventListener("click",function () {
    anotar("Interna");
});

externa.addEventListener("click",function () {
    anotar("Externa(captura)");
},true);

media.addEventListener("click",function () {
    anotar("Media(captura)");
},true);

interna.addEventListener("click",function () {
    anotar("Interna(captura)");
},true);

botonlimpiar.addEventListener("click", function () {
    registro.innerHTML="";
});


// ---------- Ejercicio 8 · Detener y cancelar ----------

const tarjetaProducto= document.getElementById("tarjeta-producto");
const botonComprar=document.getElementById("boton-comprar");
const enlaceInfo=document.getElementById("enlace-info");
let mensajeEstado=document.getElementById("mensaje-estado");



function escribirEstado(mensaje) {
    
    if (mensajeEstado.textContent) {
        mensajeEstado.textContent +='\n'+ mensaje
    }else{
        mensajeEstado.textContent=mensaje
    }
}

tarjetaProducto.addEventListener("click",(evento)=>{ 
    escribirEstado("Has pulsado la tarjeta")
})

botonComprar.addEventListener("click",(evento)=>{
    evento.stopPropagation();
    escribirEstado("Producto comprado")
})

enlaceInfo.addEventListener("click", (evento)=>{
    evento.preventDefault();
    evento.stopPropagation();
    escribirEstado("Enlace bloqueado");
})
