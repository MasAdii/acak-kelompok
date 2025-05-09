const navMenu =  document.getElementById('nav-menu')
const menuList = document.getElementById('menu-list')
const form = document.getElementById('formKontak')

navMenu.addEventListener('click', () => {
    menuList.classList.toggle('hidden')
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('name').value.trim()
    const email = document.getElementById('email').value.trim()
    const pesan = document.getElementById('pesan').value.trim()

    if (name && email && pesan){
        window.location.href = '../templates/sukses.html'
    }else{
        alert('Masukkan input yang valid')
    }
})