const blocks = document.querySelectorAll('#block');
const images = document.querySelectorAll('#block img');

fetch('json/catalogo.json')
  .then(response => response.json())
  .then(data => {
    // Obtener la galería
    const galeria = data.galeria;

    // Obtener la lista de géneros únicos
    var generos = [...new Set(data.galeria.map(pelicula => pelicula.genero))];

    // Crear las opciones del select de géneros
    var generoSelect = document.getElementById("generoSelect");
    generos.forEach(genero => {
      var option = document.createElement("option");
      option.value = genero;
      option.textContent = genero;
      generoSelect.appendChild(option);
    });

    // Agregar evento de cambio al select de géneros
    generoSelect.addEventListener("change", function() {
      var generoSeleccionado = this.value;
      mostrarPeliculas(generoSeleccionado);
    });

    // Mostrar todas las películas al inicio
    mostrarPeliculas("");

    // Mostrar películas por género
    function mostrarPeliculas(generoSeleccionado) {
      var galeria = document.getElementById("galeria");
      galeria.innerHTML = "";

      data.galeria.forEach(pelicula => {
        if (generoSeleccionado === "" || pelicula.genero === generoSeleccionado) {
          
          var block = document.createElement("div");
          block.id="block";


          var titulo = document.createElement("h3");
          titulo.textContent = pelicula.titulo;

          var info = document.createElement("p");
          info.textContent = "Género: " + pelicula.genero

          var year = document.createElement("p");
          year.textContent = "Año: " + pelicula.Año;

          var imagen = document.createElement("img");
          imagen.src = pelicula.imagen;
          imagen.addEventListener('mouseenter', (e) => {
            const elemento = e.currentTarget;
            setTimeout(() => {
              images.forEach(img => img.classList.remove('hover'));
              elemento.classList.add('hover');
            }, 300)
            

          });

          imagen.addEventListener('mouseleave', (e) => {
            const elemento = e.currentTarget;
            elemento.classList.remove('hover');
          });
          
          galeria.appendChild(block);
          block.appendChild(titulo);
          block.appendChild(imagen);
          block.appendChild(info);
          block.appendChild(year);
          

        }
      });
    }
  });

//------------------ Hover ------------------

galeria.addEventListener('mouseleave', (e) => {
  images.forEach(img => img.classList.remove('hover'));
});
