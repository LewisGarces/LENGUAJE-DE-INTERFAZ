class CatalogoPeliculas {
    #peliculas = []; // Lista de películas privada

    constructor() {
        Swal.fire('Inicializando Catálogo de Películas');
        this.cargarPeliculas(); // Cargar películas iniciales al instanciar la clase
        this.configurarEventListeners(); // Configurar event listeners
    }

    cargarPeliculas() {
        // Películas iniciales con URLs de imágenes que funcionan
        this.#peliculas = [
            // Terror
            { titulo: "The Conjuring", director: "James Wan", año: 2013, imagen: "https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_FMjpg_UX1000_.jpg", genero: "Terror" },
            { titulo: "Get Out", director: "Jordan Peele", año: 2017, imagen: "https://upload.wikimedia.org/wikipedia/en/a/a3/Get_Out_poster.png", genero: "Terror" },
            { titulo: "A Nightmare on Elm Street", director: "Wes Craven", año: 1984, imagen: "https://play-lh.googleusercontent.com/P8zi7IbMEjJiCboRrtNUnndArXpxlVazF1Rds2dOn8_GTd7Nt59ots3JTVGBHhvNaxUoCw=w240-h480-rw", genero: "Terror" },
        
            // Disney
            { titulo: "The Lion King", director: "Roger Allers, Rob Minkoff", año: 1994, imagen: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/The_Lion_King_poster.jpg/220px-The_Lion_King_poster.jpg", genero: "Disney" },
            { titulo: "Aladdin", director: "Ron Clements, John Musker", año: 1992, imagen: "https://m.media-amazon.com/images/I/81i1q8WcTjL._AC_UF1000,1000_QL80_.jpg", genero: "Disney" },
            { titulo: "The Jungle Book", director: "Jon Favreau", año: 2016, imagen: "https://upload.wikimedia.org/wikipedia/en/a/a4/The_Jungle_Book_%282016%29.jpg", genero: "Disney" },
        
            // Romance
            { titulo: "The Notebook", director: "Nick Cassavetes", año: 2004, imagen: "https://m.media-amazon.com/images/M/MV5BN2I3ZmRjODAtMjBiNy00ZmEwLWEzZjItZjM4NGZhNGYyNTA0XkEyXkFqcGdeQXVyMTEwNDU1MzEy._V1_.jpg", genero: "Romance" },
            { titulo: "Titanic", director: "James Cameron", año: 1997, imagen: "https://pics.filmaffinity.com/Titanic-321994924-mmed.jpg", genero: "Romance" },
            { titulo: "The Fault in Our Stars", director: "Josh Boone", año: 2014, imagen: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/The_Fault_in_Our_Stars_%28Official_Film_Poster%29.png/220px-The_Fault_in_Our_Stars_%28Official_Film_Poster%29.png", genero: "Romance" },
        
        ];
        Swal.fire('Películas cargadas');
        this.mostrarPeliculas(); // Mostrar películas en la interfaz
    }

    configurarEventListeners() {
        // Event listener para el botón de agregar película
        document.getElementById('addMovieButton').addEventListener('click', () => this.agregarPelicula());
        Swal.fire('Event listener para agregar película configurado');
    }

    mostrarPeliculas() {
        const moviesList = document.getElementById('moviesList');
        moviesList.innerHTML = ''; // Limpiar la lista de películas

        this.#peliculas.map((pelicula, index) => {
            const movieCard = document.createElement('div'); // Crear un elemento HTML especificado por su tagName
            movieCard.classList.add('col-md-4');
            movieCard.innerHTML = `
                <div class="card">
                    <img src="${pelicula.imagen}" class="card-img-top img-cuadrada" alt="${pelicula.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${pelicula.titulo}</h5>
                        <p class="card-text">Director: ${pelicula.director}</p>
                        <p class="card-text">Año: ${pelicula.año}</p>
                        <button class="btn btn-warning btn-sm" onclick="catalog.editarPelicula(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="catalog.eliminarPelicula(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            moviesList.appendChild(movieCard);
        });
    }

    agregarPelicula() {
        // Diálogo modal para agregar película con campo de imagen
        Swal.fire({
            title: 'Agregar Película',
            html: `
                <input id="titulo" class="swal2-input" placeholder="Título">
                <input id="director" class="swal2-input" placeholder="Director">
                <input id="año" class="swal2-input" placeholder="Año">
                <input id="imagen" class="swal2-input" placeholder="URL de la Imagen">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const titulo = document.getElementById('titulo').value;
                const director = document.getElementById('director').value;
                const año = document.getElementById('año').value;
                const imagen = document.getElementById('imagen').value;

                if (titulo && director && año && imagen) {
                    this.#peliculas.push({ titulo, director, año, imagen });
                    this.mostrarPeliculas();
                    Swal.fire('Éxito', 'Película agregada correctamente', 'success');
                } else {
                    Swal.fire('Advertencia', 'Por favor completa todos los campos', 'warning');
                }
            }
        });
    }

    editarPelicula(index) {
        const pelicula = this.#peliculas[index];
        Swal.fire({
            title: 'Editar Película',
            html: `
                <input id="editar-titulo" class="swal2-input" value="${pelicula.titulo}" placeholder="Título">
                <input id="editar-director" class="swal2-input" value="${pelicula.director}" placeholder="Director">
                <input id="editar-año" class="swal2-input" value="${pelicula.año}" placeholder="Año">
                <input id="editar-imagen" class="swal2-input" value="${pelicula.imagen}" placeholder="URL de la Imagen">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const titulo = document.getElementById('editar-titulo').value;
                const director = document.getElementById('editar-director').value;
                const año = document.getElementById('editar-año').value;
                const imagen = document.getElementById('editar-imagen').value;

                if (titulo && director && año && imagen) {
                    pelicula.titulo = titulo;
                    pelicula.director = director;
                    pelicula.año = año;
                    pelicula.imagen = imagen;
                    this.mostrarPeliculas();
                    Swal.fire('Éxito', 'Película editada correctamente', 'success');
                } else {
                    Swal.fire('Advertencia', 'Por favor completa todos los campos', 'warning');
                }
            }
        });
    }

    eliminarPelicula(index) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.#peliculas.splice(index, 1);
                this.mostrarPeliculas();
                Swal.fire('Eliminada', 'La película ha sido eliminada', 'success');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.catalog = new CatalogoPeliculas();
    Swal.fire('Catálogo de Películas inicializado');
});
