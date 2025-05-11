const navMenu = document.getElementById('nav-menu')
const menuList = document.getElementById('menu-list')
const mulaiBtn = document.getElementById('mulaiAcak')

navMenu.addEventListener('click', () => {
    menuList.classList.toggle('hidden')
})

mulaiBtn.addEventListener('click', () => {
    location.href = 'templates/content.html'
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}