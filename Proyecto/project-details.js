// project-details.js

// Función para obtener el parámetro de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Función para cargar los detalles del proyecto
function loadProjectDetails() {
    const projectId = parseInt(getQueryParam('id'), 10); // Convertir el ID a número
    if (isNaN(projectId)) {
        console.error('ID del proyecto no válido.');
        return;
    }

    fetch('../assets/archivos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(projects => {
            const project = projects.find(p => p.id === projectId);
            if (!project) {
                console.error('Proyecto no encontrado con ID:', projectId);
                return;
            }

            // Mostrar el título del proyecto
            const titleElement = document.getElementById('project-title');
            if (titleElement) {
                titleElement.textContent = project.titulo;
            }

            // Mostrar las imágenes del proyecto
            const imagesElement = document.getElementById('project-images');
            if (imagesElement) {
                imagesElement.innerHTML = ''; // Limpiar contenido existente
                project.imagenes.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = project.titulo;
                    img.style.width = '100%'; // Ajustar el tamaño de las imágenes
                    imagesElement.appendChild(img);
                });
            }

            // Mostrar la descripción del proyecto
            const descriptionElement = document.getElementById('project-description');
            if (descriptionElement) {
                descriptionElement.textContent = project.texto; // Usar 'texto' en lugar de 'descripcion'
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Llamar a la función para cargar los detalles del proyecto al cargar la página
document.addEventListener('DOMContentLoaded', loadProjectDetails);
