const hamberger  = document.querySelector('.hamberger');
const nav_bar_container = document.querySelector('.nav-bar-container');
// toggle class on hamberger click
hamberger.addEventListener('click', () => {
    nav_bar_container.classList.toggle('expand-nav-menu');
});