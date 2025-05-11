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


let deferredPrompt
const installButton = document.getElementById('installButton')

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault() 
  deferredPrompt = e
  installButton.style.display = 'block' 
})

installButton.addEventListener('click', () => {
  deferredPrompt.prompt() 
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('Pengguna memilih untuk menginstal aplikasi')
    } else {
      console.log('Pengguna membatalkan instalasi')
      installButton.style.display = 'none' 
    }
    deferredPrompt = null 
  })
})
