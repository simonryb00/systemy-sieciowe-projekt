
const toggleButton = document.getElementById('toggle-button');
const navList = document.getElementById('nav__list');

toggleButton.addEventListener('click', () => {
    navList.classList.toggle('active');
})
