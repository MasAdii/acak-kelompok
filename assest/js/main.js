const navMenu = document.getElementById('nav-menu')
const menuList = document.getElementById('menu-list')
const mulaiBtn = document.getElementById('mulaiAcak')

navMenu.addEventListener('click', () => {
    menuList.classList.toggle('hidden')
})

mulaiBtn.addEventListener('click', () => {
    location.href = 'templates/content.html'
})