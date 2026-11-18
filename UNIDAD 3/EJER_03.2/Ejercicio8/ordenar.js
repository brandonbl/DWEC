 const lista = document.getElementById("lista");
    const boton = document.getElementById("ordenarBtn");

    boton.addEventListener("click", function() {

      const elementos = lista.querySelectorAll("li");
      const arrayElementos = Array.from(elementos);
      arrayElementos.sort(function(a, b) {
        return a.textContent.localeCompare(b.textContent, "es");
      });

      lista.innerHTML = "";

      arrayElementos.forEach(function(elemento) {
        lista.appendChild(elemento);
      });

    });