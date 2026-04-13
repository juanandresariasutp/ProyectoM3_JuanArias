const routes = {
  '/home': () => showSection('home'),
  '/chat': () => showSection('chat'),
  '/about': () => showSection('about'),
};

function showSection(id) {
  // Ocultar todas las secciones
  document.querySelectorAll('section').forEach(sec => {
    sec.style.display = 'none';
  });
  // Mostrar la sección activa (usamos flex como en el CSS)
  const sectionToShow = document.getElementById(id);
  if (sectionToShow) {
    sectionToShow.style.display = 'flex';
  }
}

function navigate(path) {
  window.history.pushState({}, '', path);
  handleRoute();
}

function handleRoute() {
  let path = window.location.pathname;
  
  // Si la ruta no existe en nuestro mapeo, redirigir por defecto a /home
  if (!routes[path]) {
    window.history.replaceState({}, '', '/home');
    path = '/home';
  }
  
  // Ejecutar la función correspondiente a la ruta
  routes[path]();
}

document.addEventListener('DOMContentLoaded', () => {
  // Interceptar clicks en los enlaces de navegación
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Obtenemos la ruta del enlace
      const path = link.getAttribute('href');
      navigate(path);
    });
  });

  // Manejar navegación con los botones back/forward del navegador
  window.addEventListener('popstate', handleRoute);

  // Evaluar la ruta actual al cargar la app por primera vez
  handleRoute();
});
