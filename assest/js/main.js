const navMenu = document.getElementById('nav-menu')
const menuList = document.getElementById('menu-list')
const mulaiBtn = document.getElementById('mulaiAcak')

navMenu.addEventListener('click', () => {
    menuList.classList.toggle('hidden')
})

mulaiBtn.addEventListener('click', () => {
    location.href = 'templates/content.html'
})


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
    console.log(choiceResult.outcome)
    deferredPrompt = null
  })
})