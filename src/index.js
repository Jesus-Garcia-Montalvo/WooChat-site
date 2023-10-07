import './css/main.css'

// main.js

// Función para cargar una página
function loadPage(pageName) {
  fetch(pageName)
    .then(response => response.text())
    .then(content => {
      document.getElementById('content').innerHTML = content;
    });
}

// Manejar cambios en la URL
window.addEventListener('popstate', function(event) {
  const path = location.pathname;
  loadPage(`./${path}.html`);
});

// Cargar la página inicial
loadPage('./index.html');